# Resume Sources

Resume variants are Markdown files in this directory. The existing
`Peter_Eberle_Resume_2024.pdf` remains the site's `CV` download until one
Markdown resume is made active.

## Create A Variant

Copy `resume.template.md.example` to a `.md` filename, replace its content,
and set the frontmatter:

```yaml
---
type: resume
slug: general
title: Peter Eberle
active: true
---
```

Every `type: resume` file becomes a printable page at `/resume/<slug>/`.
Only one resume may set `active: true`; that page becomes the `CV` link in
the site header. Inactive variants remain renderable and exportable without
being advertised in navigation.

The document is a single-column reading order for both screeners and human
readers. Use standard sections in this sequence:

```text
Summary (optional)
Experience
Skills
Education
Awards or Additional Experience (optional)
```

The example uses `h4` elements for every visible heading. Wrap each section
in `.resume-section` and each job or credential in `.resume-entry`; entries
avoid page breaks and retain their dates and supporting bullets together.

## Export PDFs

Install dependencies once, then generate one or more U.S. Letter PDFs:

```sh
npm run resume:pdf -- general
npm run resume:pdf -- general design
```

PDFs are written to `content/resume/generated/<slug>.pdf`. The command fails
when an exported resume is longer than two pages.
