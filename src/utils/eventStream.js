// Reads a server-sent event stream from a fetch response and calls onEvent(name, data)
// for each complete event. Events without an "event:" line are named "message".
export async function readEventStream(response, onEvent) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const dispatch = (block) => {
    let name = "message";
    const dataLines = [];
    for (const line of block.split("\n")) {
      if (line.startsWith("event: ")) {
        name = line.slice(7).trim();
      } else if (line.startsWith("data: ")) {
        dataLines.push(line.slice(6));
      }
    }
    if (dataLines.length > 0) {
      onEvent(name, dataLines.join("\n"));
    }
  };

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    // Events are separated by a blank line; the last part may be incomplete
    const blocks = buffer.split("\n\n");
    buffer = blocks.pop() || "";
    blocks.forEach(dispatch);
  }

  buffer += decoder.decode();
  if (buffer.trim()) {
    dispatch(buffer);
  }
}
