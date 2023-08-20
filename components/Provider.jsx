"use client";

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

const Provider = ({ children, session }) => {
	return (
		<SessionProvider session={session}>
			<SnackbarProvider
				autoHideDuration={1000}
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				{children}
			</SnackbarProvider>
		</SessionProvider>
	);
};

export default Provider;
