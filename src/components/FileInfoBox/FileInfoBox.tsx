import { FileInfoType } from "@app/services/fetch-files";

type Props = FileInfoType;

export default function FileInfoBox({ name, date }: Props) {
  return (
    <div className="flex flex-col p-4 border border-white rounded-3xl">
      <span className="text-sm mb-1">{date}</span>
      <span className="text-lg">{name}</span>
    </div>
  );
}
