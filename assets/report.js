(function () {
  const repoIssuesUrl = "https://github.com/go-manga/GoMangaApp/issues";
  const form = document.querySelector("[data-issue-form]");
  const preview = document.querySelector("[data-preview]");
  const copyButton = document.querySelector("[data-copy-template]");

  if (!form || !preview) {
    return;
  }

  function field(name) {
    const input = form.elements[name];
    if (!input) return "";
    if (input.type === "checkbox") return input.checked ? "Yes" : "No";
    return String(input.value || "").trim();
  }

  function line(label, value) {
    return `- ${label}: ${value || "_Not provided_"}`;
  }

  function section(title, value) {
    return `## ${title}\n${value || "_Not provided_"}\n`;
  }

  function buildBody() {
    const diagnosticsAvailable = field("diagnosticsAvailable") === "Yes"
      ? "User can attach diagnostics/screenshots"
      : "No diagnostics confirmed yet";

    return [
      "## Environment",
      line("Area", field("area")),
      line("Severity", field("severity")),
      line("App version", field("appVersion")),
      line("OS version", field("osVersion")),
      line("Device", field("device")),
      line("Source / host", field("source")),
      line("Diagnostics", diagnosticsAvailable),
      "",
      section("Steps to reproduce", field("steps")),
      section("Expected result", field("expected")),
      section("Actual result", field("actual")),
      section("Diagnostics or notes", field("diagnostics")),
      "## Privacy check",
      "- I removed passwords, private tokens, full cookies, paid content, and personal information before posting."
    ].join("\n");
  }

  function updatePreview() {
    preview.textContent = buildBody();
  }

  async function copyTemplate() {
    updatePreview();
    if (!navigator.clipboard) {
      return;
    }
    await navigator.clipboard.writeText(buildBody());
    if (copyButton) {
      const originalText = copyButton.textContent;
      copyButton.textContent = "已複製";
      window.setTimeout(function () {
        copyButton.textContent = originalText;
      }, 1800);
    }
  }

  form.addEventListener("input", updatePreview);
  form.addEventListener("change", updatePreview);
  if (copyButton) {
    copyButton.addEventListener("click", function () {
      copyTemplate().catch(function () {
        updatePreview();
      });
    });
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    updatePreview();
    window.location.href = repoIssuesUrl;
  });

  updatePreview();
})();
