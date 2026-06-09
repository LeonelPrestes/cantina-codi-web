import { api } from "@/lib/axios";

interface CreateCouponBody {
  title: string;
  description?: string;
  discount?: number;
  percentDiscount?: number;
  quantity: number;
}

export async function createCoupon(data: CreateCouponBody) {
  await api.post("/createCoupon", data);
}