import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import download from 'downloadjs';

// --- Helper: Get File Extension ---
const getExt = (file: File) => file.name.split('.').pop()?.toLowerCase();

// --- Action: Merge PDFs ---
export const mergePDFs = async (files: File[]) => {
  const mergedPdf = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  return await mergedPdf.save();
};

// --- Action: Split PDF (Extract all pages as separate files) ---
// Note: For simplicity in this demo, we save the first file's pages as a ZIP or individual downloads.
// Since we can't easily zip client-side without another lib, we'll return the array of Uint8Arrays and handle download in component
export const splitPDF = async (file: File): Promise<{ data: Uint8Array, name: string }[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pageCount = pdf.getPageCount();
  const results = [];

  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFDocument.create();
    const [page] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(page);
    const pdfBytes = await newPdf.save();
    results.push({
      data: pdfBytes,
      name: `${file.name.replace('.pdf', '')}_page_${i + 1}.pdf`
    });
  }
  return results;
};

// --- Action: Rotate PDF ---
export const rotatePDF = async (file: File, rotation: number) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();
  pages.forEach(page => {
    const currentRotation = page.getRotation().angle;
    page.setRotation(degrees(currentRotation + rotation));
  });
  return await pdf.save();
};

// --- Action: JPG/PNG to PDF ---
export const imagesToPDF = async (files: File[]) => {
  const pdfDoc = await PDFDocument.create();
  
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const ext = getExt(file);
    let image;
    
    if (ext === 'jpg' || ext === 'jpeg') {
      image = await pdfDoc.embedJpg(arrayBuffer);
    } else if (ext === 'png') {
      image = await pdfDoc.embedPng(arrayBuffer);
    } else {
      continue; 
    }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }
  return await pdfDoc.save();
};

// --- Action: Protect PDF (Add Password) ---
export const protectPDF = async (file: File, password: string) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pdfBytes = await pdf.save({
    userPassword: password,
    ownerPassword: password, // usually good to set both
  });
  return pdfBytes;
};

// --- Action: Unlock PDF (Remove Password) ---
// Note: pdf-lib requires the password to load it. 
// If loaded successfully, saving it without options removes the password.
export const unlockPDF = async (file: File, password: string) => {
  const arrayBuffer = await file.arrayBuffer();
  try {
      const pdf = await PDFDocument.load(arrayBuffer, { password });
      return await pdf.save(); // Saved without password
  } catch (e) {
      throw new Error("Incorrect password or file error");
  }
};

// --- Action: Watermark PDF ---
export const watermarkPDF = async (file: File, text: string) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pages = pdf.getPages();

  pages.forEach(page => {
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: width / 2 - (text.length * 15), // Rough centering
      y: height / 2,
      size: 50,
      font: font,
      color: rgb(0.75, 0.75, 0.75),
      rotate: degrees(45),
      opacity: 0.5,
    });
  });

  return await pdf.save();
};

// --- Action: Page Numbers ---
export const addPageNumbers = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const pages = pdf.getPages();
  const total = pages.length;

  pages.forEach((page, idx) => {
    const { width } = page.getSize();
    page.drawText(`${idx + 1} / ${total}`, {
      x: width - 50,
      y: 20,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    });
  });

  return await pdf.save();
};

// --- Action: Compress PDF (Simulated) ---
// Real PDF compression requires re-sampling images which is complex in pdf-lib alone.
// We will just save it, which sometimes removes unused objects.
export const compressPDF = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  // pdf-lib doesn't support aggressive compression options natively yet
  // We simulate by saving object streams if not default
  return await pdf.save({ useObjectStreams: true });
};
