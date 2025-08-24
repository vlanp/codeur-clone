import type { IProject } from "../../interfaces/IProject";

const ProjectCardExtended = ({ project }: { project: IProject }) => {
  return (
    <div className="card p-4 lg:p-8">
      <div className="flex gap-1 mb-2"></div>
      <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-darker">
        {project.titre}
      </h1>
      <div className="flex gap-4 flex-col">
        <p className="font-medium mb-0 flex flex-wrap">
          <span className="whitespace-nowrap">
            <svg
              className="svg-inline--fa p-[1.5px] m-0.5 text-2xs"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path
                fill={
                  project.statut === "Ouvert"
                    ? "#22c55e"
                    : project.statut === "Fermé"
                    ? "#ef4444"
                    : "#3415faff"
                }
                d="M64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320z"
              />
            </svg>
            <i className="fas fa-circle p-[1.5px] m-0.5 text-2xs text-green"></i>
            &nbsp;{project.statut || "En travail"}
          </span>
          <span className="px-1.5">·</span>
          <span
            className="whitespace-nowrap"
            data-controller="tooltip"
            title=""
            data-bs-original-title="Budget indicatif"
          >
            {project.budget_detaille}
          </span>
          <span className="px-1.5">·</span>
          <span
            className="whitespace-nowrap"
            data-controller="tooltip"
            title=""
            data-bs-original-title="Nombre d'offres"
          >
            {project.offres}
          </span>
          <span className="px-1.5">·</span>
          <span className="whitespace-nowrap">{project.vues}</span>
          <span className="px-1.5">·</span>
          <span className="whitespace-nowrap">{project.interactions}</span>
        </p>
      </div>
      <hr className="my-8" />
      <div className="project-description break-words">
        <div className="mb-8">
          <div
            className="content [&amp;&gt;p:last-child]:mb-0"
            data-turbo="false"
          >
            <p
              dangerouslySetInnerHTML={{
                __html: project.description.replace(/\n/g, "<br>"),
              }}
            />
          </div>
          <div className="project-description-version"></div>
        </div>
        <div className="project-details mt-6">
          <div className="py-0 details [&amp;&gt;.detail:last-child]:mb-8"></div>
          <section className="pt-0 flex flex-col gap-3">
            <p className="flex items-start gap-2 m-0">
              <span>
                <span className="bg-opacity-10 bg-primary text-primary inline-flex justify-center items-center w-8 h-8 rounded-full">
                  <svg
                    className="svg-inline--fa fa-euro-sign fa-w-10"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="euro-sign"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M315.6 458.6l-6.5-29.4c-1.4-6.5-8-10.6-14.5-9.1-10.3 2.4-26.5 5.4-44.7 5.4-65.5 0-117-39.5-138.2-97.4h129.5c5.7 0 10.6-4 11.7-9.6l5-24c1.5-7.5-4.1-14.4-11.7-14.4h-148c-1.5-16.1-2.1-32.3-.6-48h162.5c5.7 0 10.6-4 11.7-9.5l5.1-24c1.6-7.5-4.1-14.5-11.7-14.5H108.1c21-58.4 72.5-98 140-98 14.7 0 28.9 2.1 38.2 3.8 6.2 1.1 12.2-2.6 13.8-8.7l7.9-29.6c1.8-6.8-2.5-13.6-9.4-14.9-11.4-2.1-29.4-4.7-49.3-4.7-100 0-179.7 64.1-205.9 152H12c-6.6 0-12 5.4-12 12v24c0 6.6 5.4 12 12 12h23.1c-1.2 15.8-1 35.5.4 48H12c-6.6 0-12 5.4-12 12v24c0 6.6 5.4 12 12 12h32.2c26 88.7 103.4 152 205 152 24.4 0 45.4-4.2 57.5-7.2 6.4-1.6 10.3-7.9 8.9-14.2z"
                    ></path>
                  </svg>
                  <i className="far fa-euro-sign"></i>
                </span>
              </span>
              <span className="pt-1">
                Budget indicatif&nbsp;:
                <span className="font-semibold">{project.budget_detaille}</span>
              </span>
            </p>
            <p className="flex items-start gap-2 m-0">
              <span>
                <span className="bg-opacity-10 bg-primary text-primary inline-flex justify-center items-center w-8 h-8 rounded-full">
                  <svg
                    className="svg-inline--fa fa-calendar-alt fa-w-14"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="calendar-alt"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"
                    ></path>
                  </svg>
                  <i className="far fa-calendar-alt"></i>
                </span>
              </span>
              <span className="pt-1">
                Publication&nbsp;:
                <span className="font-semibold">
                  {project.date_publication}
                </span>
              </span>
            </p>
            <p className="flex items-start gap-2 m-0">
              <span>
                <span className="bg-opacity-10 bg-primary text-primary inline-flex justify-center items-center w-8 h-8 rounded-full">
                  <svg
                    className="svg-inline--fa fa-user fa-w-14"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="user"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
                    ></path>
                  </svg>
                  <i className="far fa-user"></i>
                </span>
              </span>
              <span className="pt-1">
                Profils recherchés&nbsp;:
                <span className="font-semibold">
                  {project.profils_recherches
                    .map((it) => it.nom)
                    .map((techno, index) => {
                      if (index > 0) {
                        return (
                          <span key={techno}>
                            ,&nbsp;
                            <a
                              className="font-semibold text-body-color"
                              data-turbo="false"
                            >
                              {techno}
                            </a>
                          </span>
                        );
                      }
                      return (
                        <span key={techno}>
                          <a
                            className="font-semibold text-body-color"
                            data-turbo="false"
                          >
                            {techno}
                          </a>
                        </span>
                      );
                    })}
                </span>
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardExtended;
