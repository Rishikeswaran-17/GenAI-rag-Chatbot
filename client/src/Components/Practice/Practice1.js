import React, { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const Practice1 = () => {
  const docs = [
    { uri: require("../example-files/pdf.pdf"),
      fileType: "pdf",
      fileName: "pdf.pdf",
    }, // Local File
  ];
  const [activeDocument, setActiveDocument] = useState(docs[0]);

  const handleDocumentChange = (document) => {
    setActiveDocument(document);
  };

  return (
    <DocViewer
      documents={docs}
      initialActiveDocument={docs[1]}
      pluginRenderers={DocViewerRenderers}
      theme={{
        primary: "#5296d8",
        secondary: "#ffffff",
        tertiary: "#5296d899",
        textPrimary: "#ffffff",
        textSecondary: "#5296d8",
        textTertiary: "#00000099",
        disableThemeScrollbar: false,
      }}
      onDocumentChange={handleDocumentChange}
    />
  );
};

export default Practice1;
