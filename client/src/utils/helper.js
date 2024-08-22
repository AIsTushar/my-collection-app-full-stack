import { formatDistanceStrict, parseISO } from "date-fns";

export const formatTimeAgo = (dateString) => {
  const date = parseISO(dateString);
  return formatDistanceStrict(date, new Date(), { addSuffix: true });
};
