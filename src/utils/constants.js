export const Fields = [
  {
    id: 1,
    name: "Text Elements",
    children: [
      {
        id: 1,
        name: "Text",
        type: "input",
        subType: "text",
        isSaved: false,
      },
      {
        id: 2,
        name: "Email",
        type: "input",
        subType: "email",
        isSaved: false,
      },
      {
        id: 3,
        name: "Number",
        type: "input",
        subType: "number",
        isSaved: false,
      },
      {
        id: 4,
        name: "Paragraph",
        type: "textarea",
        isSaved: false,
      },
    ],
  },
  {
    id: 2,
    name: "Multiple Choice",
    children: [
      {
        id: 1,
        name: "Dropdown",
        type: "select",
        isSaved: false,
      },
      {
        id: 2,
        name: "Checkbox",
        type: "checkbox",
        isSaved: false,
        // subType: "checkbox",
      },
      {
        id: 3,
        name: "Radio",
        type: "radio",
        isSaved: false,
        // subType: "radio",
      },
    ],
  },
  {
    id: 2,
    name: "Media Elements",
    children: [
      {
        id: 1,
        name: "Upload File",
        type: "input",
        subType: "file",
        isSaved: false,
      },
    ],
  },
];