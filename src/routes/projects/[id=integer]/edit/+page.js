import { writable } from "svelte/store";
import getInitialData from "src/utils/get-initial-data.js";
import { prepareAfterBackend } from "src/utils/project-manipulation.js";

export async function load(page, session) {
  const data = await getInitialData(
    this,
    session,
    new Map([["project", `/projects/${page.params.id}`]])
  );

  if (
    session.account == null ||
    (session.account.email !== data.project.creator.email &&
      !session.account.is_admin)
  ) {
    this.error(403, "Edit the Project");
  }

  data.project.activities.forEach(prepareAfterBackend);
  data.account = session.account;
  data.project = writable(data.project);
  return data;
}
