---
# STUB, and deliberately the redacted one.
#
# `status: under-review` + `anonymized: true` is the double-blind case. Every
# renderer routes through isRedacted() in src/lib/collections.ts: the list shows
# title, venue and status only, and /publications/aaai-abstention is never
# generated. Flip `anonymized` to false the day it is accepted and the full
# entry — figure, tldr, highlights, links, detail page — appears on its own.
title: 'TODO: paper title'
authors:
  - Zhuoan Li
venue: 'TODO: venue'
year: 2027
type: conference
status: under-review
anonymized: true

tldr: 'Not rendered while anonymized — safe to fill in now.'
highlights:
  - 'Not rendered while anonymized.'
themes:
  - Evaluation at scale

links: {}

featured: false
order: 1
---

Body content is not rendered while this entry is anonymized, so it is safe to
write the paper up here in advance.
