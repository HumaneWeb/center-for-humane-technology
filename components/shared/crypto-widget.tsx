export default function GivingBlockWidget() {
  return (
    //sm:max-w-sm md:max-w-md lg:max-w-lg
    <div className="mx-auto aspect-[430/620] w-full max-w-[430px]">
      <iframe
        src="https://widget.thegivingblock.com/?organizationId=1189134835&version=2&apiUserUuid=e6cf7d18-41b6-4a6c-954a-338578fd90b0&donationFlow=crypto%2Cstock%2Cdaf&fundraiserId=&scriptId=tgb-widget-script&campaignId=&origin=https%3A%2F%2Fwww.humanetech.com%2Fdonate"
        frameBorder="0"
        scrolling="no"
        className="h-full w-full border-0"
      />
    </div>
  );
}
