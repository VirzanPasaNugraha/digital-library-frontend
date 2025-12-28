export function withWatermark(pdfUrl) {
  if (!pdfUrl) return "";
  return pdfUrl.replace(
    "/upload/",
    "/upload/l_watermark,g_center,o_20,w_0.6/"
  );
}
