export const fetcher = async (
  url: string,
  init?: RequestInit | undefined
): Promise<any> => {
  const res = await fetch(url, init);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const info = await res.json();
    // Attach extra info to the error object.
    const message = Array.isArray(info?.message)
      ? info?.message.join("; ")
      : info?.message;
    const error = new Error(
      message || "Đã xảy ra lỗi trong quá trình tải dữ liệu"
    );
    (error as any).status = res.status;
    (error as any).responseData = info;

    console.warn(url, "\nAn error occurred while fetching:\n", info);

    throw error;
  }

  return res.json();
};
