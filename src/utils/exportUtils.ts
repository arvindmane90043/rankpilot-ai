import { jsPDF } from "jspdf";

export function exportPDF(title: string, content: string) {
  const pdf = new jsPDF();

  const lines = pdf.splitTextToSize(content, 180);

  pdf.setFontSize(18);
  pdf.text(title, 15, 20);

  pdf.setFontSize(11);
  pdf.text(lines, 15, 35);

  pdf.save(`${title}.pdf`);
}