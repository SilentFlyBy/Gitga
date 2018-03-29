import * as React from "react";
import * as ReactDOM from "react-dom";
import { Status } from "../../../../core/git/file-status";
import {
    List, ListItem, SvgIcon, CardHeader,
    Paper, Toolbar, ToolbarGroup, ToolbarTitle,
    IconButton,
} from "material-ui";
import {
    ContentInbox, EditorModeEdit,
    ContentAddBox, ContentContentCopy,
    ActionDeleteForever, ContentRedo,
    ActionHelp, ContentAddCircle, ContentRemoveCircle,
} from "material-ui/svg-icons";

export default class FileStatusArea extends React.Component<IFileStatusProps, any> {
    private className: string;
    private title: string;

    constructor(props: IFileStatusProps) {
        super(props);

        if (props.type === FileStatusAreaType.Index) {
            this.className = "stagingArea";
            this.title = "Index";
        } else if (props.type === FileStatusAreaType.WorkTree) {
            this.className = "workspaceArea";
            this.title = "Worktree";
        }
    }

    public render() {
        const fileStateElements = [];
        const style = {
            card: {
                margin: "5px",
            },
            toolbar: {
                height: "24px",
            },
            toolbarTitle: {
                fontSize: "16px",
            },
            button: {
                padding: 0,
            },
            item: {
                lineHeight: "6px",
                padding: 0,
                fontSize: "12px",
            },
            nested: {
                padding: "6px 56px",
            },
        };

        for (const s of this.props.fileStates) {
            const fileStatus = this.GetFileStatusIndicator(s.Status);
            const stagingActionIcon = this.GetStagingActionIcon(this.props.type, [s]);

            fileStateElements.push(
                <ListItem key={s.Path1}
                    primaryText={s.Path1}
                    leftIcon={fileStatus}
                    rightIcon={stagingActionIcon}
                    style={style.item}
                    innerDivStyle={style.nested} />,
            );
        }

        return (
            <Paper style={style.card} >
                <Toolbar style={style.toolbar}>
                    <ToolbarGroup>
                        <ToolbarTitle text={this.title} style={style.toolbarTitle} />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <IconButton style={style.button}>
                            {this.GetStagingActionIcon(this.props.type, this.props.fileStates)}
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
                <List>
                    {fileStateElements}
                </List>
            </Paper>
        );
    }

    public OnSync() {
        if (typeof this.props.onSync === "function") {
            this.props.onSync();
        }
    }

    private OnStage = (files: IAreaFileStatus[]) => {
        if (typeof this.props.onStage === "function") {
            this.props.onStage(files);
        }
    }

    private GetFileStatusIndicator(status: Status): JSX.Element {
        const style = {
            height: "14px",
            width: "14px",
            margin: "2px",
        };

        switch (status) {
            case Status.Added:
                return <ContentAddBox style={style} />;
            case Status.Copied:
                return <ContentContentCopy style={style} />;
            case Status.Deleted:
                return <ActionDeleteForever style={style} />;
            case Status.Untracked:
                return <ActionHelp style={style} />;
            case Status.Modified:
                return <EditorModeEdit style={style} />;
            case Status.Renamed:
                return <ContentRedo style={style} />;
        }
    }

    private GetStagingActionIcon(type: FileStatusAreaType, files: IAreaFileStatus[]): JSX.Element {
        const style = {
            height: "14px",
            width: "14px",
            margin: "2px",
        };

        switch (type) {
            case FileStatusAreaType.Index:
                return <ContentRemoveCircle onClick={() => this.OnStage(files)} style={style} />;
            case FileStatusAreaType.WorkTree:
                return <ContentAddCircle onClick={() => this.OnStage(files)} style={style} />;
        }
    }
}

export interface IAreaFileStatus {
    Path1: string;
    Path2?: string;
    Status: Status;
}

export enum FileStatusAreaType {
    Index,
    WorkTree,
}

interface IFileStatusProps {
    fileStates: IAreaFileStatus[];
    type?: FileStatusAreaType;
    onSync?: () => void;
    onStage?: (files: IAreaFileStatus[]) => void;
}
