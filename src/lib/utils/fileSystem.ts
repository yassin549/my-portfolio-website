import { yassin } from "./devInfo";

export const fileSystem = {
  home: {
    about: `
${yassin.about}

Programming Languages:
${yassin.code.join(", ")}

Operating Systems:
${yassin.operatingSystems.join(", ")}

Tools Used:
${yassin.toolsUsed.join(", ")}

IDEs:
${yassin.ides.join(", ")}
    `,
    projects: {},
    interests: `
${yassin.interests.join("\n")}
    `,
  },
};
