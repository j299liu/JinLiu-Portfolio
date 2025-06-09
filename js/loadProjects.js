const projects = [
    "https://j299liu.github.io/JinLiu-Portfolio/projects/MARCH_on_a_new_datum.html",
    // Add more project filenames here...
  ];
  
  async function fetchProjectMetadata(projectFile) {
    try {
      const res = await fetch(projectFile);
      const text = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
  
      return {
        href: projectFile,
        image: doc.querySelector('meta[name="project-image"]').content,
        title: doc.querySelector('meta[name="project-title"]').content,
        year: doc.querySelector('meta[name="project-year"]').content,
        category: doc.querySelector('meta[name="project-category"]').content,
        label: doc.querySelector('meta[name="project-label"]').content,
      };
    } catch (error) {
      console.error("Error loading project:", projectFile, error);
      return null;
    }
  }

  async function renderProjects(containerId) {
  const container = document.getElementById(containerId);
  const promises = projects.map(async (file) => {
    const data = await fetchProjectMetadata(file);
    if (data) {
      const div = document.createElement("div");
      div.className = `col-md-4 col-sm-6 ${data.category}`;
      div.innerHTML = `
        <a href="${data.href}" class="portfolio_item">
          <img src="${data.image}" alt="image" class="img-responsive" />
          <div class="portfolio_item_hover">
            <div class="portfolio-border clearfix">
              <div class="item_info">
                <span>${data.title}</span>
                <span>${data.year}</span>
                <em>${data.label}</em>
              </div>
            </div>
          </div>
        </a>
      `;
      container.appendChild(div);
    }
  });

  await Promise.all(promises);
  }