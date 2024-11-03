import { FileInfoType } from "@app/app/actions";
import FileInfoBox from "../FileInfoBox/FileInfoBox";

type Props = {
  files: FileInfoType[];
};

export default function FileListing({ files }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {files.map((f) => (
        <FileInfoBox key={f.rowNumber} {...f} />
      ))}
    </div>
  );
}
