import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import { getCurrentUser } from "@/actions/getCurrentUser";
import UserMenu from "./UserMenu";
import CartCount from "./CartCount";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const logoMobile = "IG";
const NavBar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div
      className="
        sticky
        top-0
        w-full
        bg-slate-200
        z-30
        shadow-sm
        "
    >
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
                       flex
                       item-center
                       justify-between
                       gap-3
                       md:gap-0
                    "
          >
            <Link
              href="/"
              className={`${redressed.className} font-bold text-2xl`}
            >
              Informatique Guinée
            </Link>
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="flex  items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default NavBar;
