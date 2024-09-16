self.onmessage = async e => {
    const { content, chunkSize } = e.data;
    const decoder = new TextDecoder("utf-8");
    const fileSize = content.byteLength;
    let offset = 0;
    const chunks = [];

    while (offset < fileSize) {
        const chunkEnd = Math.min(offset + chunkSize, fileSize);
        const chunk = content.slice(offset, chunkEnd);
        const decodedChunk = decoder.decode(chunk, { stream: true });
        self.postMessage({ chunks: batch, transferable: [content] });
        offset = chunkEnd;
    }

    // Indicate reading complete
    self.postMessage({ done: true });
};
