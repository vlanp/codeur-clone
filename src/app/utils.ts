import { formatDistanceToNow, parse } from "date-fns";
import { fr } from "date-fns/locale";

function formatDateRelative(dateString: string) {
  try {
    const date = parse(dateString, "dd MMMM yyyy 'à' HH'h'mm", new Date(), {
      locale: fr,
    });

    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: fr,
    });
  } catch (e) {
    console.error(e);
    return dateString;
  }
}

export { formatDateRelative };
