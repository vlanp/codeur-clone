import CodeImg from "../../components/codeImg";
import { formatDateRelative } from "../../utils";

const ProjectCard = ({
  title,
  status,
  budget,
  offers,
  views,
  interactions,
  description,
  technos,
  publicationDate,
  id,
  url,
}: {
  title: string;
  status: "Ouvert" | "En travail" | "Fermé";
  budget: string;
  offers: string;
  views: string;
  interactions: string;
  description: string;
  technos: string[];
  publicationDate: string;
  id: string;
  url: string;
}) => {
  return (
    <div
      className="mb-4 card p-6"
      id="project-463099"
      data-controller="project-preview"
      data-action="mouseleave-&gt;project-preview#showSummary"
    >
      <div className="flex mt-1">
        <div className="hidden lg:block mr-4">
          <div className="bg-gray-100 rounded-lg p-4">
            <CodeImg />
          </div>
        </div>
        <div className="w-full">
          <div className="mb-1">
            <div className="float-right ms-2"></div>
            <h3 className="mb-0 text-[1.1875rem]">
              <a href={url} className="no-underline visited:text-visited">
                {title}
              </a>
            </h3>
          </div>
          <p className="text-neutral-600 font-medium mb-2 flex flex-wrap">
            <span className="whitespace-nowrap">
              <svg
                className="svg-inline--fa p-[1.5px] m-0.5 text-2xs"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path
                  fill={
                    status === "Ouvert"
                      ? "#22c55e"
                      : status === "Fermé"
                      ? "#ef4444"
                      : "#3415faff"
                  }
                  d="M64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320z"
                />
              </svg>
              &nbsp;{status || "En travail"}
            </span>
            <span className="px-1.5">·</span>
            <span
              className="whitespace-nowrap"
              data-controller="tooltip"
              title=""
              data-bs-original-title="Budget indicatif"
            >
              {budget}
            </span>
            <span className="px-1.5">·</span>
            <span
              className="whitespace-nowrap"
              data-controller="tooltip"
              title=""
              data-bs-original-title="Nombre d’offres"
            >
              {offers}
            </span>
            <span className="px-1.5">·</span>
            <span className="whitespace-nowrap">{views}</span>
            <span className="px-1.5">·</span>
            <span className="whitespace-nowrap">{interactions}</span>
          </p>
          <div
            className="mt-2 break-anywhere line-clamp-3"
            data-project-preview-target="summary"
          >
            {description}
          </div>
          <div
            className="mt-2 break-words hidden"
            data-project-preview-target="preview"
          ></div>
          <div className="mt-2 flex flex-wrap">
            {technos.map((techno, index) => {
              if (index > 0) {
                return (
                  <div key={techno}>
                    <span className="px-1.5">·</span>
                    <a className="text-neutral-600 font-medium no-underline">
                      {techno}
                    </a>
                  </div>
                );
              }
              return (
                <a
                  key={techno}
                  className="text-neutral-600 font-medium no-underline"
                >
                  {techno}
                </a>
              );
            })}
          </div>
          <div className="md:flex items-center justify-between mt-2">
            <div className="text-muted">
              <span>{formatDateRelative(publicationDate)} </span>
              <span>
                par
                <span
                  data-controller="tooltip"
                  title="Le nom du porteur de projet n'est accessible qu'aux prestataires abonnés"
                >
                  {" "}
                  Client {id}
                </span>
              </span>
            </div>
            <div className="mt-3 md:mt-0 gap-3 flex items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
