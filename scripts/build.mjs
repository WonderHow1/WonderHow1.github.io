import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (file) => readFile(path.join(root, file), 'utf8');
const [template, styles, art, script, siteText, projectsText] = await Promise.all([
  read('src/index.html'), read('src/styles.css'), read('src/pixel-art.js'),
  read('src/app.js'), read('content/site.json'), read('content/projects.json'),
]);
const site = JSON.parse(siteText);
const allProjects = JSON.parse(projectsText);

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function validateUrl(value, name) {
  if (!value) return;
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error(`${name} 必须是网页链接`);
}

for (const field of ['name', 'github', 'description']) {
  if (typeof site[field] !== 'string' || !site[field].trim()) throw new Error(`网站设置缺少 ${field}`);
}
validateUrl(site.github, 'GitHub 主页');
if (!Array.isArray(allProjects)) throw new Error('作品内容必须是数组');
const ids = new Set();
for (const project of allProjects) {
  for (const field of ['id', 'name', 'kind', 'summary', 'detail', 'tech']) {
    if (typeof project[field] !== 'string' || !project[field].trim()) throw new Error(`项目缺少 ${field}`);
  }
  if (!/^[a-z0-9-]+$/.test(project.id) || ids.has(project.id)) throw new Error(`项目 ID 无效或重复 ${project.id}`);
  ids.add(project.id);
  validateUrl(project.url, project.name);
  if (project.repo && !/^[a-zA-Z0-9_.-]+$/.test(project.repo)) throw new Error('仓库名无效');
  for (const field of ['cover', 'video']) {
    const media = project[field];
    if (media && !/^media\/[^\\?#<>]+$/.test(media)) throw new Error('图片和视频须使用媒体库中的文件');
    if (media?.split('/').includes('..')) throw new Error('媒体路径无效');
  }
  if (project.tone && !/^#[0-9a-fA-F]{6}$/.test(project.tone)) throw new Error('封面底色须为六位色值');
}
// Old entries without a publication flag remain visible.
const projects = allProjects.filter((project) => project.published !== false);
const scenes = new Set(['phone', 'map', 'flow', 'chart', 'content']);

function illustration(project) {
  if (project.cover) return `<img src="${escapeHtml(project.cover)}" alt="${escapeHtml(project.coverAlt || `${project.name}项目截图`)}" loading="lazy" width="480" height="320">`;
  const scene = scenes.has(project.scene) ? project.scene : 'map';
  return `<canvas data-scene="${scene}" aria-label="${escapeHtml(project.name)}概念示意"></canvas><span class="concept">概念示意</span>`;
}

function projectCard(project) {
  const name = escapeHtml(project.name);
  const media = project.video
    ? `<div class="project-image video-preview"><video controls playsinline preload="metadata" poster="${escapeHtml(project.cover || '')}" src="${escapeHtml(project.video)}" aria-label="${name}产品介绍视频">你的浏览器无法播放此视频。<a href="${escapeHtml(project.video)}">打开视频</a></video></div>`
    : `<a class="project-image" href="#project-${project.id}" aria-label="查看${name}">${illustration(project)}</a>`;
  return `
          <article class="project" style="--tone:${project.tone || '#dce8f1'}">
            ${media}
            <div class="project-copy">
              <p class="meta"><span>${escapeHtml(project.kind)}</span></p>
              <h3>${name}</h3>
              <p class="summary">${escapeHtml(project.summary)}</p>
              <div class="project-foot"><span class="technology">${escapeHtml(project.tech)}</span><a class="text-link" href="#project-${project.id}">了解项目</a></div>
            </div>
          </article>`;
}

const values = {
  ...Object.fromEntries(Object.entries(site).map(([key, value]) => [key, escapeHtml(value)])),
  styles, art, script,
  projects: projects.map(projectCard).join('\n'),
  data: JSON.stringify(projects).replaceAll('<', '\\u003c'),
};
const html = template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
  if (!(key in values)) throw new Error(`未知模板变量 ${key}`);
  return values[key];
});
await mkdir(path.join(root, 'site'), { recursive: true });
await writeFile(path.join(root, 'site/index.html'), html);
await writeFile(path.join(root, 'site/.nojekyll'), '');
console.log(`已生成作品集，包含 ${projects.length} 个已发布项目。`);
