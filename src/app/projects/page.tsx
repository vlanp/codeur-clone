import html from "./index.html?raw";

const ProjectsPage = () => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default ProjectsPage;
