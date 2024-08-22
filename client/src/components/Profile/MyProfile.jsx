import { CiEdit } from "react-icons/ci";
import ProfileButton from "./ProfileButton";
import { getProfilePageData, updateProfile } from "../../utils/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function MyProfile() {
  const token = useSelector((state) => state.user.token);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfilePageData(token);
        const nameParts = data.name.trim().split(" ");
        const firstName = nameParts[0];
        const lastName =
          nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
        setFormData({
          firstName: firstName,
          lastName: lastName,
          email: data.email || "",
        });
        setProfileData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token, setFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
    };
    try {
      const response = await updateProfile(data, token);
      const nameParts = response.data.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
      setFormData({
        firstName: firstName,
        lastName: lastName,
        email: response.data.email || "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-12 py-8 w-full">
      <h1 className="text-xl font-medium mb-8">My Profile</h1>

      <div className="flex w-[100%] items-center gap-6 border border-gray-300 px-8 py-6 rounded-lg">
        <img
          className="h-24 w-24 rounded-full object-fill"
          src={profileData?.picture}
          alt="Profile"
        />
        <div>
          <p className="text-lg font-semibold">{profileData?.name}</p>
          <p>{profileData?.isAdmin ? "Admin" : "User"}</p>
          <p>{profileData?.collections.length} collections</p>
        </div>
      </div>

      <div className="w-full border border-gray-300 px-8 py-6 rounded-lg mt-8">
        <h1 className="text-xl font-medium mb-6">Personal Information</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4 gap-2 lg:flex-row lg:gap-4">
            <div className="flex flex-col w-full gap-1 lg:w-[50%]">
              <label className="text-sm text-gray-500" htmlFor="firstName">
                First Name
              </label>
              <input
                className="input w-full"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full gap-1 lg:w-[50%]">
              <label className="text-sm text-gray-500" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="input w-full"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-1 lg:w-[50%] mb-4">
            <label className="text-sm text-gray-500" htmlFor="email">
              Email
            </label>
            <input
              className="input w-full"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <ProfileButton type="submit">
            Save <CiEdit />
          </ProfileButton>
        </form>
      </div>

      {/* Change password part */}
      {/* <div className="w-full border border-gray-300 px-8 py-6 rounded-lg mt-8">
        <h1 className="text-xl font-medium mb-6">Change Password</h1>
        <form action="">
          <div className="flex mb-4">
            <div className="flex flex-col w-[50%] gap-1">
              <label
                className="text-sm text-gray-500"
                htmlFor="currentPassword"
              >
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                className="input placeholder:text-stone-400"
                placeholder="********"
                required
              />
            </div>

            <div className="flex flex-col w-[50%] gap-1">
              <label className="text-sm text-gray-500" htmlFor="newPassword">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                className="input placeholder:text-stone-400"
                placeholder="********"
                required
              />
            </div>
          </div>
          <ProfileButton>
            Edit <CiEdit />
          </ProfileButton>
        </form>
      </div> */}
    </div>
  );
}

export default MyProfile;
