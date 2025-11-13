import Image from "next/image";

export const FooterTrust = ({ altText }: { altText: string }) => (
	<a
		referrerPolicy="origin"
		target="_blank"
		href="https://trustseal.enamad.ir/?id=662386&Code=rjSjruE6FYX9LOcZMBLx5JylAAONJbQo"
	>
		<Image
			src="https://trustseal.enamad.ir/logo.aspx?id=662386&Code=rjSjruE6FYX9LOcZMBLx5JylAAONJbQo"
			alt={altText}
			width={86}
			height={86}
			referrerPolicy="origin"
			style={{ cursor: "pointer" }}
		/>
	</a>
);
