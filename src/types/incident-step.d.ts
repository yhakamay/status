type IncidentStep = {
    summary: string;
    resolves: boolean;
    notes: Notes;
    occurred: string;
};

type TextContent = {
    nodeType: "text";
    value: string;
};

type ParagraphContent = {
    nodeType: "paragraph";
    content: TextContent[];
};

type Notes = {
    json: (ParagraphContent | TextContent)[]; // Depending on the possible node types, you can add more types to this union.
};
