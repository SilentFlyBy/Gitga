import * as React from "react";
import { FileHunk } from "../../../../core/git/file-status/file-hunk";

export default class FileViewComponent extends React.Component<IFileViewProps> {
    public render() {
        const hunks = [];
        for (const h of this.props.Hunks) {
            const lines = [];
            for (const l of h.Lines) {
                let line;
                if (l.newNumber >= 0 && l.oldNumber < 0) {
                    line = <div className="added" key={l.Content + l.newNumber}>
                        <span>{l.newNumber}</span>
                        {l.Content}
                    </div>;
                } else if (l.newNumber >= 0 && l.oldNumber >= 0) {
                    line = <div key={l.Content + l.newNumber}>
                        <span>{l.newNumber}</span>
                        {l.Content}
                    </div>;
                } else {
                    line = <div className="removed" key={l.Content + l.oldNumber}>
                        <span>{l.oldNumber}</span>
                        {l.Content}
                    </div>;
                }
                lines.push(line);
            }
            hunks.push(<div className="paper" key={h.Lines.toString()}>{lines}</div>);
        }
        return (
            <div className="file-view paper">
                {hunks}
            </div>
        );
    }
}

export interface IFileViewProps {
    Hunks: FileHunk[];
}
