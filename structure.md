# Component structure

```
<App>
  <Header />

  <TabList>
    <Tab id="edit">Edit</Tab>
    <Tab id="preview">Preview</Tab>
    <Tab id="output">Output</Tab>
  </TabList>

  <TabContents for="edit">
    <EditorToolbar>
      <Textbox />
      <>
    </EditorToolbar>
    <TypeScaleEditor>

    </TypeScaleEditor>

    <CodeOutput />
  </TabContents>

  <TabContents for="preview">
    <PreviewToolbar />

    <TypeScalePreview />
  </TabContents>

  <TabContents for="output">
    <CodeOutput />
  </TabContents>
</App>
```