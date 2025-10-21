import { CheckoutFormSkeleton } from "@/checkout/sections/CheckoutForm";
import { SummarySkeleton } from "@/checkout/sections/Summary";

export const CheckoutSkeleton = () => (
	<div className="min-h-screen px-4 lg:px-0">
		<div className="grid grid-cols-1 gap-x-16 lg:grid-cols-2 lg:grid-rows-1">
			<div className="lg:col-start-1 lg:col-end-1">
				<CheckoutFormSkeleton />
			</div>
			<div className="h-6 w-full lg:col-start-2 lg:col-end-2 lg:h-full lg:w-5" />
			<div className="lg:col-start-2 lg:col-end-2">
				<SummarySkeleton />
			</div>
		</div>
	</div>
);
