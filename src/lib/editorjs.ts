export interface EditorJSBlock {
	type: string;
	data: {
		text?: string;
		items?: string[];
		file?: { url: string };
		caption?: string;
	};
}

export interface EditorJSData {
	time?: number;
	blocks: EditorJSBlock[];
	version?: string;
}
