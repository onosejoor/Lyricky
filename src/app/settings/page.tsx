import Settings from "./_components/Form";
import { verifyUser } from "@/app/_lib/dal";
import User from "@/lib/models/user.model";

export default async function SettingPage() {
  const user = (await verifyUser()).user as string;

  const data = await User.findById(user).select({
    email: 1,
    username: 1,
    avatar: 1,
    _id: 0,
  });

  if (data) {
    const userData = {
      email: data.email,
      username: data.username,
      avatar: data.avatar,
    };
    return <Settings data={userData} />;
  }
}
