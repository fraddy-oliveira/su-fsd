import FileGrid from "@app/components/FileGrid/FileGrid";
import { FileSortingOptionsType } from "@app/utils/file-grid-constants";
import { getFilesAction } from "./actions";

export default async function Home() {
  const files = await getFilesAction(FileSortingOptionsType.CREATED_AT_ASC);

  return <FileGrid initialFileListing={files} />;
}
