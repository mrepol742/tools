"use client";
import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import type { Tool } from "./tool-data";

type Data = Record<string, unknown>;

const apiType = (t: Tool) =>
  t.mode === "text"
    ? "ip"
    : t.mode === "url"
      ? t.path.includes("redirect")
        ? "redirect"
        : "page"
      : t.mode;
const primary =
  "mt-5 inline-flex rounded bg-[#127a43] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0d6135] disabled:opacity-60";

export default function ToolWorkbench({ tool }: { tool: Tool }) {
  if (tool.mode === "html") return <HtmlEditor />;
  return <StandardWorkbench tool={tool} />;
}

function StandardWorkbench({ tool }: { tool: Tool }) {
  const [value, setValue] = useState("");
  const [data, setData] = useState<Data | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setError("");
    setData(null);
    setText("");

    try {
      if (!value.trim()) throw new Error("Enter a value to continue.");

      if (tool.mode === "json") {
        setText(JSON.stringify(JSON.parse(value), null, 2));
        return;
      }

      if (tool.mode === "base64") {
        try {
          setText(atob(value));
        } catch {
          setText(btoa(unescape(encodeURIComponent(value))));
        }
        return;
      }

      if (tool.mode === "qr") {
        setText(value);
        return;
      }

      setLoading(true);
      const res = await fetch(
        `/api/check?type=${apiType(tool)}&value=${encodeURIComponent(value)}`,
      );
      const result = await res.json();

      if (!res.ok)
        throw new Error(result.error || "The check could not be completed.");
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border border-[#dce7df] bg-[#f4f8f5] p-5 sm:p-7">
      <label htmlFor="tool-input" className="mb-3 block text-sm font-bold">
        {tool.inputLabel}
      </label>
      <textarea
        id="tool-input"
        rows={tool.mode === "json" ? 9 : 3}
        value={value}
        placeholder={tool.placeholder}
        onChange={(e) => setValue(e.target.value)}
        className="w-full resize-y rounded border border-[#b9ccbe] bg-white p-4 text-sm leading-6 outline-[#127a43]"
      />
      <div className="flex gap-3">
        <button className={primary} onClick={run} disabled={loading}>
          {loading
            ? "Checking…"
            : tool.mode === "json"
              ? "Format JSON"
              : tool.mode === "base64"
                ? "Encode / decode"
                : tool.mode === "qr"
                  ? "Generate QR code"
                  : "Run check"}
        </button>
        {value && (
          <button
            className="mt-5 rounded border border-[#b6cfbe] px-5 py-3 text-sm font-bold text-[#127a43]"
            onClick={() => {
              setValue("");
              setData(null);
              setText("");
              setError("");
            }}
          >
            Clear
          </button>
        )}
      </div>
      {error && <p className="mt-4 text-red-700">{error}</p>}
      {text && <TextResult tool={tool} text={text} />}{" "}
      {data && <DataResult tool={tool} data={data} />}
    </section>
  );
}

const starterHtml = `<!-- Paste HTML from a WordPress Custom HTML block here -->
<section class="notice">
  <h1>Welcome to your page</h1>
  <p>Edit this HTML and the preview updates after 500ms.</p>
  <a href="#">Read more</a>
</section>

<style>
  .notice { max-width: 640px; margin: 48px auto; padding: 32px; font-family: sans-serif; border: 1px solid #dce7df; }
  h1 { color: #127a43; }
  a { color: #127a43; }
</style>`;

type PreviewDevice = "desktop" | "tablet" | "phone";
const deviceSizes: Record<PreviewDevice, number> = {
  desktop: 1440,
  tablet: 768,
  phone: 390,
};

function HtmlEditor() {
  const [source, setSource] = useState(starterHtml);
  const [preview, setPreview] = useState(starterHtml);
  const [device, setDevice] = useState<PreviewDevice>("desktop");
  const [previewSize, setPreviewSize] = useState(deviceSizes.desktop);
  const [fullPreview, setFullPreview] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setPreview(source), 500);
    return () => window.clearTimeout(timer);
  }, [source]);
  const selectDevice = (next: PreviewDevice) => {
    setDevice(next);
    setPreviewSize(deviceSizes[next]);
  };
  return (
    <section className="border border-[#dce7df] bg-[#f4f8f5] p-4 sm:p-6">
      <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold tracking-[-.03em]">
            Live HTML workspace
          </h2>
          <p className="mt-1 text-sm text-[#5d6d64]">
            The preview refreshes 500ms after you stop typing.
          </p>
        </div>
        <button
          className="w-fit rounded border border-[#b6cfbe] px-4 py-2 text-sm font-bold text-[#127a43]"
          onClick={() => setSource(starterHtml)}
        >
          Restore sample
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="min-w-0">
          <div className="flex items-center justify-between border border-b-0 border-[#b9ccbe] bg-white px-4 py-2">
            <span className="text-sm font-bold">HTML</span>
            <span className="text-xs text-[#5d6d64]">Syntax highlighted</span>
          </div>
          <div className="h-[480px] overflow-auto border border-[#b9ccbe] bg-white">
            <CodeMirror
              value={source}
              height="478px"
              extensions={[html()]}
              onChange={setSource}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                highlightActiveLine: true,
              }}
            />
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border border-b-0 border-[#b9ccbe] bg-white px-4 py-2">
            <span className="text-sm font-bold">Preview</span>
            <button
              className="rounded border border-[#b6cfbe] px-3 py-1 text-xs font-bold text-[#127a43]"
              onClick={() => setFullPreview(true)}
            >
              Full view ↗
            </button>
          </div>
          <div className="flex h-[480px] overflow-auto border border-[#b9ccbe] bg-[#eef5f0] p-4">
            <iframe
              title="Live HTML preview"
              sandbox=""
              srcDoc={preview}
              className="h-full w-full border border-[#b9ccbe] bg-white"
            />
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-[#5d6d64]">
        Useful for checking WordPress Custom HTML blocks, page-builder snippets,
        headings, links, classes, and inline styles. JavaScript is intentionally
        disabled in the preview.
      </p>
      {fullPreview && (
        <FullPreview
          preview={preview}
          device={device}
          size={previewSize}
          onClose={() => setFullPreview(false)}
          onDevice={selectDevice}
          onSize={setPreviewSize}
        />
      )}
    </section>
  );
}

function FullPreview({
  preview,
  device,
  size,
  onClose,
  onDevice,
  onSize,
}: {
  preview: string;
  device: PreviewDevice;
  size: number;
  onClose: () => void;
  onDevice: (device: PreviewDevice) => void;
  onSize: (size: number) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[#f4f8f5] p-4 sm:p-6">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#cfe0d3] pb-4">
          <div>
            <h2 className="text-xl font-semibold tracking-[-.03em]">
              Full preview
            </h2>
            <p className="mt-1 text-sm text-[#5d6d64]">
              Choose a device preset or set an exact viewport width.
            </p>
          </div>
          <button
            className="rounded border border-[#b6cfbe] px-4 py-2 text-sm font-bold text-[#127a43]"
            onClick={onClose}
          >
            Close ×
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-4 py-4">
          <div className="flex rounded border border-[#cfe0d3] bg-white p-0.5">
            {(["desktop", "tablet", "phone"] as const).map((item) => (
              <button
                key={item}
                onClick={() => onDevice(item)}
                className={`rounded px-4 py-2 text-sm font-bold capitalize ${device === item ? "bg-[#127a43] text-white" : "text-[#5d6d64]"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-sm text-[#5d6d64]">
            Width{" "}
            <input
              aria-label="Preview width"
              type="range"
              min="320"
              max="1440"
              step="1"
              value={size}
              onChange={(event) => onSize(Number(event.target.value))}
              className="accent-[#127a43]"
            />
            <strong className="w-14 text-[#10251c]">{size}px</strong>
          </label>
        </div>
        <div className="flex flex-1 justify-center overflow-auto border border-[#b9ccbe] bg-[#e6efe8] p-5">
          <iframe
            title={`Full ${device} HTML preview`}
            sandbox=""
            srcDoc={preview}
            style={{ width: `${size}px` }}
            className="h-full min-w-[320px] shrink-0 border border-[#b9ccbe] bg-white"
          />
        </div>
      </div>
    </div>
  );
}

function TextResult({ tool, text }: { tool: Tool; text: string }) {
  return (
    <div className="mt-6 flex items-center gap-6 border-l-3 border-[#127a43] bg-white p-5">
      {tool.mode === "qr" && (
        <img
          className="size-36"
          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(text)}`}
          alt="Generated QR code"
        />
      )}
      <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-[#32473a]">
        {tool.mode === "qr" ? `QR code generated for:\n${text}` : text}
      </pre>
    </div>
  );
}

function DataResult({ tool, data }: { tool: Tool; data: Data }) {
  if (tool.path === "/seo/opengraph" || tool.path === "/seo/meta-tags")
    return (
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[.09em] text-[#5d6d64]">
            Social media preview
          </p>
          <article className="overflow-hidden border border-[#dce7df] bg-white">
            {typeof data.image === "string" && data.image ? (
              <img
                className="h-44 w-full object-cover"
                src={data.image}
                alt="Open Graph preview"
              />
            ) : (
              <div className="grid h-44 place-items-center bg-[#dceee2] font-bold text-[#0d6135]">
                {data.siteName as string}
              </div>
            )}
            <div className="p-4">
              <small className="block text-xs uppercase text-[#637267]">
                {data.siteName as string}
              </small>
              <strong className="mt-1 block">{data.title as string}</strong>
              <p className="mt-2 text-sm leading-5 text-[#637267]">
                {data.description as string}
              </p>
            </div>
          </article>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[.09em] text-[#5d6d64]">
            Google search preview
          </p>
          <article className="border border-[#dce7df] bg-white p-5">
            <small className="block text-xs text-[#3c7a48]">
              {(data.url as string)
                .replace(/^https?:\/\//, "")
                .split("/")
                .slice(0, 2)
                .join(" › ")}
            </small>
            <a className="mt-2 block text-lg text-[#1a0dab]">
              {data.title as string}
            </a>
            <p className="mt-2 text-sm leading-5 text-[#637267]">
              {data.description as string}
            </p>
          </article>
        </div>
        <details className="md:col-span-2">
          <summary className="cursor-pointer text-sm text-[#127a43]">
            View fetched metadata
          </summary>
          <pre className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-[#32473a]">
            {JSON.stringify(
              tool.path === "/seo/meta-tags" ? data.meta : data,
              null,
              2,
            )}
          </pre>
        </details>
      </div>
    );

  return (
    <div className="mt-6 border-l-3 border-[#127a43] bg-white p-5">
      <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-[#32473a]">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
