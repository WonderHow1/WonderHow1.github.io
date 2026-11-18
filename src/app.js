const projects = JSON.parse(document.querySelector('#portfolio-data').textContent);
const projectDialog = document.querySelector('#project-dialog');

document.querySelectorAll('canvas[data-scene]').forEach((canvas) => scene(canvas, canvas.dataset.scene));

function renderExperience(project) {
  const body = projectDialog.querySelector('.dialog-body');
  body.replaceChildren();
  if (!project.star) {
    body.textContent = project.detail;
    return;
  }
  const sections = [
    ['项目背景', project.star.situation],
    ['目标任务', project.star.task],
    ['关键行动', project.star.actions],
    ['项目成果', project.star.results],
  ];
  for (const [title, content] of sections) {
    const section = document.createElement('section');
    section.className = 'experience-section';
    const heading = document.createElement('h3');
    heading.textContent = title;
    section.append(heading);
    const text = document.createElement(Array.isArray(content) ? 'ul' : 'p');
    if (Array.isArray(content)) {
      for (const item of content) {
        const point = document.createElement('li');
        point.textContent = item;
        text.append(point);
      }
    } else {
      text.textContent = content;
    }
    section.append(text);
    body.append(section);
  }
}

function displayProject() {
  const id = location.hash.replace(/^#project-/, '');
  const project = projects.find((item) => item.id === id);
  if (!location.hash.startsWith('#project-') || !project) {
    if (projectDialog.open) projectDialog.close();
    return;
  }
  projectDialog.querySelector('#project-title').textContent = project.name;
  projectDialog.querySelector('.dialog-meta').textContent = `${project.kind} / ${project.tech}`;
  renderExperience(project);
  const imageContainer = projectDialog.querySelector('.detail-image');
  const originalImage = projectDialog.querySelector('.original-image');
  originalImage.hidden = !project.cover || Boolean(project.video);
  imageContainer.classList.toggle('has-cover', Boolean(project.cover));
  imageContainer.querySelectorAll('video').forEach((video) => video.pause());
  imageContainer.replaceChildren();
  if (project.video) {
    originalImage.removeAttribute('href');
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.src = project.video;
    video.poster = project.cover || '';
    video.setAttribute('aria-label', `${project.name}产品介绍视频`);
    imageContainer.append(video);
  } else if (project.cover) {
    const image = document.createElement('img');
    image.src = project.cover;
    image.alt = project.coverAlt || `${project.name}项目截图`;
    imageContainer.append(image);
    originalImage.href = project.cover;
  } else {
    originalImage.removeAttribute('href');
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-label', `${project.name}概念示意`);
    imageContainer.append(canvas);
    scene(canvas, project.scene || 'map');
  }
  const repositoryLink = projectDialog.querySelector('.repo-link');
  const publicUrl = project.url || (project.repo ? `https://github.com/WonderHow1/${project.repo}` : '');
  repositoryLink.hidden = Boolean(project.private) || !publicUrl;
  if (!repositoryLink.hidden) repositoryLink.href = publicUrl;
  else repositoryLink.removeAttribute('href');
  projectDialog.querySelector('.private-note').hidden = !project.private;
  if (!projectDialog.open) projectDialog.showModal();
  projectDialog.scrollTop = 0;
}

window.addEventListener('hashchange', displayProject);
document.addEventListener('play', (event) => {
  if (!(event.target instanceof HTMLVideoElement)) return;
  document.querySelectorAll('video').forEach((video) => {
    if (video !== event.target) video.pause();
  });
}, true);
projectDialog.addEventListener('close', () => {
  projectDialog.querySelectorAll('video').forEach((video) => video.pause());
});
function closeDialog(dialog) {
  if (dialog === projectDialog && location.hash.startsWith('#project-')) {
    history.replaceState(null, '', `${location.pathname}${location.search}#works`);
  }
  dialog.close();
}
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.querySelector('.close').addEventListener('click', () => closeDialog(dialog));
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeDialog(dialog);
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog(dialog);
  });
});

displayProject();
