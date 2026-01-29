export default function MyProfile({ handleSignout, email }) {
  return (
    <div>
      <div className="font-semibold text-xl ">My Profile</div> <div></div>
      <div className="flex flex-col gap-3 items-center mt-2">
        {" "}
        <div className="flex gap-3 justify-center text-[1.2rem]">
          <div>email:</div>
          <div>{email}</div>
        </div>
        <button
          className="bg-gray-300 rounded p-1 w-[30%] sm:w-[10%] text-[1.2rem]"
          onClick={handleSignout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
