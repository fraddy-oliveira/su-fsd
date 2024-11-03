import FileGrid from "@app/components/FileGrid/FileGrid";
import fetchFiles from "@app/services/fetch-files";
import { FileSortingOptionsType } from "@app/utils/file-grid-constants";

export default async function Home() {
  const files = await fetchFiles(FileSortingOptionsType.CREATED_AT_ASC);

  return <FileGrid initialFileListing={files} />;
}
