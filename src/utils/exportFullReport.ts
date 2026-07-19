import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";


export async function exportFullReport(
  project: string,
  keyword: string,
  topic: string,
  content: any
) {

  const children = [
    new Paragraph({
      children: [
        new TextRun({
          text: "RankPilot AI - SEO Report",
          bold: true,
          size: 32,
        }),
      ],
    }),

    new Paragraph(`Project: ${project}`),
    new Paragraph(`Keyword: ${keyword}`),
    new Paragraph(`Topic: ${topic}`),

    new Paragraph(""),
  ];


  Object.entries(content).forEach(([key, value]: any) => {

    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: key.replace("_", " ").toUpperCase(),
            bold: true,
            size: 24,
          }),
        ],
      })
    );


    children.push(
      new Paragraph(
        String(value)
      )
    );

  });


  const doc = new Document({
    sections: [
      {
        children,
      },
    ],
  });


  const blob = await Packer.toBlob(doc);


  saveAs(
    blob,
    `${project}-SEO-Report.docx`
  );

}

console.log("exportFullReport loaded");