# License review

`index.html` is a self-contained page for legal review: open it in any browser, even offline.

It covers the third-party licenses, the full dependency inventory and the hosted-service dependencies of DevHub / OpenEdge. The text version of the same inventory is `THIRD-PARTY-NOTICES.md` at the repository root.

It was generated from `cargo metadata --locked`, `ui/package-lock.json` and a ScanCode Toolkit scan. Regenerate it whenever `Cargo.lock` or `ui/package-lock.json` changes.
