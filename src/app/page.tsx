import FileGrid from "@app/components/FileGrid/FileGrid";
import fetchFiles from "@app/services/fetch-files";
import { FilterType } from "@app/utils/grid";

export default async function Home() {
  const files = await fetchFiles(FilterType.CREATED_AT_ASC);

  return <FileGrid initialFileListing={files} />;
}
