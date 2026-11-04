
{/*                                                                    */}
{/*ALL ICON WERE FOUND IN THE ITEM CATALOG OF: https://svgdesk.com/en/ */}
{/*                                                                    */}


type IconName =
  | "home"
  | "info"
  | "help"
  | "catalog"
  | "tag"
  | "compass"
  | "menu"
  | "close"
  | "search"
  | "user"
  | "users"
  | "bell"
  | "settings"
  | "shopping-cart"
  | "bookmark"
  | "heart"
  | "calendar"
  | "clock"
  | "mail"
  | "phone"
  | "globe"
  | "star"
  | "filter"
  | "download"
  | "plus"
  | "minus"
  | "chevron-left"
  | "chevron-right";

interface UiIconProps {
  name: IconName;
  size?: number;
}

export default function UiIcon({
  name,
  size = 24,
}: UiIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* NAVIGATION */}

      {name === "home" && (
        <>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
          <path d="M9 21v-6h6v6" />
        </>
      )}

      {name === "compass" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2.5 5-5 2.5 2.5-5 5-2.5Z" />
        </>
      )}

      {name === "menu" && (
        <>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </>
      )}

      {name === "close" && (
        <>
          <path d="m18 6-12 12" />
          <path d="m6 6 12 12" />
        </>
      )}

      {name === "chevron-left" && (
        <path d="m15 18-6-6 6-6" />
      )}

      {name === "chevron-right" && (
        <path d="m9 18 6-6-6-6" />
      )}

      {/* INFORMATION */}

      {name === "info" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v6" />
          <path d="M12 8h.01" />
        </>
      )}

      {name === "help" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-1.1 1-1.7 1.3-1.7 3.2" />
          <path d="M12 17.5h.01" />
        </>
      )}

      {/* CATALOG & PRODUCTS */}

      {name === "catalog" && (
        <>
          <path d="M3 8h18l-2 13H5L3 8Z" />
          <path d="M3 8 5.5 3h13L21 8" />
          <path d="M9 21v-6h6v6" />
        </>
      )}

      {name === "tag" && (
        <>
          <path d="M20 13 13 20 3 10V3h7l10 10Z" />
          <circle cx="7.5" cy="7.5" r="1" />
        </>
      )}

      {name === "search" && (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m16 16 5 5" />
        </>
      )}

      {name === "shopping-cart" && (
        <>
          <circle cx="9" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2 3h2l3 14h12l3-10H5" />
        </>
      )}

      {name === "bookmark" && (
        <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4z" />
      )}

      {name === "heart" && (
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z" />
      )}

      {name === "star" && (
        <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2L7 14.2l-5-4.9 6.9-1z" />
      )}

      {name === "filter" && (
        <>
          <path d="M4 7h16" />
          <path d="M7 12h10" />
          <path d="M10 17h4" />
          <circle cx="8" cy="7" r="1" />
          <circle cx="15" cy="12" r="1" />
        </>
      )}

      {/* PEOPLE & ACCOUNT */}

      {name === "user" && (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </>
      )}

      {name === "users" && (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      )}

      {name === "bell" && (
        <>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </>
      )}

      {name === "settings" && (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.6-1.4-2.4 1.4-1.1a8 8 0 0 1 0-1.8L6.3 12l1.4-2.4 1.7.6a8 8 0 0 1 1.5-.9l.3-1.8H14l.3 1.8a8 8 0 0 1 1.5.9l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 1.9z" />
        </>
      )}

      {/* COMMUNICATION */}

      {name === "mail" && (
        <>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 7 10 7 10-7" />
        </>
      )}

      {name === "phone" && (
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L7.7 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 2.2 2.5z" />
      )}

      {name === "globe" && (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15 15 0 0 1 0 20" />
          <path d="M12 2a15 15 0 0 0 0 20" />
        </>
      )}

      {/* DATE & TIME */}

      {name === "calendar" && (
        <>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </>
      )}

      {name === "clock" && (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </>
      )}

      {/* ACTIONS */}

      {name === "download" && (
        <>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="m7 10 5 5 5-5" />
          <path d="M12 15V3" />
        </>
      )}

      {name === "plus" && (
        <>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </>
      )}

      {name === "minus" && (
        <path d="M5 12h14" />
      )}

    </svg>
  );
}

