import {getLinkBySlug, getLinks} from "@/actions/link.action";
import URL from "@/models/url.model";
import {redirect} from "next/navigation";

const page = async ({params}) => {
  const {id} = await params;

  const res = await getLinkBySlug(id);
  const org_url = res?.data?.original_url;
  redirect(org_url);

  return <div>Params: {id}</div>;
};
export default page;
