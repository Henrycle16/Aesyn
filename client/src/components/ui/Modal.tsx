"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "next/link";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
interface LayoutProps {
  children: React.ReactNode;
}

function Modal({ children }: LayoutProps) {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();

  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <Box>
            <Container className="bg-white m-auto p-4" sx={{ borderRadius: '16px' }}>
                <IconButton className="p-0" sx={{ display: "flex", ml: "auto" }}>
                  <Link href={pathname}>
                    <CloseIcon />
                  </Link>
                </IconButton>
              <div className="flex flex-col items-center">{children}</div>
            </Container>
          </Box>
        </dialog>
      )}
    </>
  );
}

export default Modal;
