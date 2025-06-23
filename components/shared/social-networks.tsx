type Props = {
  networks: {
    facebookUrl: string | null;
    facebookLabel: string | null;
    twitterXUrl: string | null;
    twitterXLabel: string | null;
    linkedinUrl: string | null;
    linkedinLabel: string | null;
    youtubeUrl: string | null;
    youtubeLabel: string | null;
  };
};

export default function SocialNetworks({ networks }: Props) {
  return (
    <div className="flex flex-col gap-5">
      {networks.facebookUrl && (
        <a
          href={networks.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4"
        >
          <FacebookIcon />
          <span className="text-primary-teal font-sans text-xl leading-120 font-medium underline">
            {networks.facebookLabel}
          </span>
        </a>
      )}
      {networks.twitterXUrl && (
        <a
          href={networks.twitterXUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4"
        >
          <TwitterIcon />
          <span className="text-primary-teal font-sans text-xl leading-120 font-medium underline">
            {networks.twitterXLabel}
          </span>
        </a>
      )}
      {networks.linkedinUrl && (
        <a
          href={networks.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4"
        >
          <LinkedinIcon />
          <span className="text-primary-teal font-sans text-xl leading-120 font-medium underline">
            {networks.linkedinLabel}
          </span>
        </a>
      )}
      {networks.youtubeUrl && (
        <a
          href={networks.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4"
        >
          <YoutubeIcon />
          <span className="text-primary-teal font-sans text-xl leading-120 font-medium underline">
            {networks.youtubeLabel}
          </span>
        </a>
      )}
    </div>
  );
}

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
    <circle cx="22.5" cy="22.5" r="22" fill="#293462" stroke="white" />
    <path
      d="M24.6667 24.2381H27.7619L29 19.2857H24.6667V16.8095C24.6667 15.5343 24.6667 14.3333 27.1429 14.3333H29V10.1733C28.5964 10.1201 27.0723 10 25.4628 10C22.1013 10 19.7143 12.0515 19.7143 15.819V19.2857H16V24.2381H19.7143V34.7619H24.6667V24.2381Z"
      fill="white"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
    <circle cx="22.5" cy="22.5" r="22" fill="#293462" stroke="white" />
    <path
      d="M24.9047 21.4696L32.3513 13H30.5873L24.1187 20.3525L18.956 13H13L20.8087 24.1194L13 33H14.764L21.5907 25.2338L27.044 33H33M15.4007 14.3016H18.1107L30.586 31.7624H27.8753"
      fill="white"
    />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
    <circle cx="22.5" cy="22.5" r="22" fill="#293462" stroke="white" />
    <path
      d="M18.0291 30H14.2973V18.65H18.0291V30ZM16.1612 17.1017C14.9679 17.1017 14 16.1682 14 15.0412C14 14.4998 14.2277 13.9806 14.633 13.5978C15.0383 13.2151 15.588 13 16.1612 13C16.7344 13 17.2841 13.2151 17.6894 13.5978C18.0947 13.9806 18.3224 14.4998 18.3224 15.0412C18.3224 16.1682 17.3541 17.1017 16.1612 17.1017ZM31.996 30H28.2722V24.4749C28.2722 23.1581 28.2441 21.4695 26.332 21.4695C24.3918 21.4695 24.0945 22.9001 24.0945 24.38V30H20.3667V18.65H23.9458V20.1982H23.998C24.4963 19.3065 25.7133 18.3654 27.5289 18.3654C31.3057 18.3654 32 20.7143 32 23.7653V30H31.996Z"
      fill="white"
    />
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
    <circle cx="22.5" cy="22.5" r="22" fill="#293462" stroke="white" />
    <path
      d="M34.4985 16.8164C34.2225 15.7078 33.4092 14.8347 32.3766 14.5384C30.505 14 23 14 23 14C23 14 15.495 14 13.6234 14.5384C12.5908 14.8347 11.7775 15.7078 11.5015 16.8164C11 18.8258 11 23.0182 11 23.0182C11 23.0182 11 27.2106 11.5015 29.22C11.7775 30.3286 12.5908 31.1653 13.6234 31.4616C15.495 32 23 32 23 32C23 32 30.505 32 32.3766 31.4616C33.4092 31.1653 34.2225 30.3286 34.4985 29.22C35 27.2106 35 23.0182 35 23.0182C35 23.0182 35 18.8258 34.4985 16.8164ZM20.5454 26.8246V19.2118L26.8181 23.0183L20.5454 26.8246Z"
      fill="white"
    />
  </svg>
);
