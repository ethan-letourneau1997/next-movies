// import { Button, Group } from "@mantine/core";
// import {
//   IconDashboard,
//   IconFileText,
//   IconHome,
//   IconSearch,
// } from "@tabler/icons-react";
// import { SpotlightProvider, spotlight } from "@mantine/spotlight";

// import type { SpotlightAction } from "@mantine/spotlight";

// export function SpotlightControl() {
//   return (
//     <Group position="center">
//       <Button onClick={spotlight.open}>Open spotlight</Button>
//     </Group>
//   );
// }

// export const actions: SpotlightAction[] = [
//   {
//     title: "title",

//     onTrigger: () => console.log("title"),
//   },
//   {
//     title: "title",

//     onTrigger: () => console.log("title"),
//   },
//   {
//     title: "title",

//     onTrigger: () => console.log("title"),
//   },
// ];

// export function SpotlightDemo() {
//   return (
//     <SpotlightProvider
//       actions={actions}
//       searchIcon={<IconSearch size="1.2rem" />}
//       searchPlaceholder="Search..."
//       shortcut="mod + shift + 1"
//       nothingFoundMessage="Nothing found..."
//     >
//       <SpotlightControl />
//     </SpotlightProvider>
//   );
// }
