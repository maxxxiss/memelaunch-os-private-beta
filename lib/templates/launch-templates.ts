export interface LaunchTemplate {
  name: string;
  description: string;
  checklist: Array<{ section: string; title: string; description: string }>;
  tasks: Array<{ title: string; priority: string; description?: string }>;
  content: Array<{ title: string; platform: string; notes?: string }>;
}

export const TEMPLATES: Record<string, LaunchTemplate> = {
  basic: {
    name: "Basic Launch",
    description: "Essential checklist for any token launch",
    checklist: [
      { section: "brand", title: "Define token name and ticker", description: "Finalize your memecoin identity" },
      { section: "brand", title: "Create logo and branding assets", description: "Design professional visuals" },
      { section: "community", title: "Set up Telegram group", description: "Create and configure your community channel" },
      { section: "content", title: "Write launch announcement", description: "Prepare your X/Twitter launch thread" },
      { section: "technical", title: "Configure token metadata", description: "Set up token image and description" },
      { section: "technical", title: "Review liquidity pool strategy", description: "Plan your DEX launch" },
      { section: "post_launch", title: "Monitor holder growth", description: "Track early adoption" },
      { section: "post_launch", title: "Engage with community", description: "Respond to questions and feedback" },
    ],
    tasks: [
      { title: "Prepare launch announcement", priority: "high" },
      { title: "Set up X profile", priority: "high" },
      { title: "Set up Telegram group", priority: "high" },
      { title: "Prepare community rules", priority: "medium" },
      { title: "Verify project links", priority: "medium" },
    ],
    content: [
      { title: "Launch announcement thread", platform: "x", notes: "Pin to profile" },
      { title: "Community introduction", platform: "telegram", notes: "Welcome message" },
    ],
  },
  solana_meme: {
    name: "Solana Meme Launch",
    description: "Optimized for Solana memecoin launches",
    checklist: [
      { section: "brand", title: "Define token name and ticker", description: "Finalize your memecoin identity" },
      { section: "brand", title: "Create logo and branding assets", description: "Design professional visuals" },
      { section: "brand", title: "Prepare meme pack", description: "Create shareable meme content" },
      { section: "community", title: "Set up Telegram group", description: "Create and configure your community channel" },
      { section: "community", title: "Set up Discord server", description: "Create your Discord community" },
      { section: "content", title: "Write launch thread", description: "Prepare your X/Twitter launch thread" },
      { section: "content", title: "Create content calendar", description: "Plan your first week of posts" },
      { section: "technical", title: "Configure token metadata", description: "Set up token image and description" },
      { section: "technical", title: "Review liquidity pool strategy", description: "Plan your DEX launch" },
      { section: "technical", title: "Prepare Raydium/Jupiter pool", description: "Configure DEX liquidity" },
      { section: "post_launch", title: "Monitor holder growth", description: "Track early adoption" },
      { section: "post_launch", title: "Engage with community", description: "Respond to questions and feedback" },
    ],
    tasks: [
      { title: "Prepare launch announcement", priority: "high" },
      { title: "Set up X profile", priority: "high" },
      { title: "Set up Telegram group", priority: "high" },
      { title: "Prepare meme pack", priority: "high" },
      { title: "Prepare community rules", priority: "medium" },
      { title: "Verify project links", priority: "medium" },
      { title: "Schedule launch announcement", priority: "high" },
      { title: "Schedule post-launch update", priority: "medium" },
    ],
    content: [
      { title: "Launch announcement thread", platform: "x", notes: "Pin to profile" },
      { title: "Meme pack preview", platform: "x", notes: "Showcase memes" },
      { title: "Community introduction", platform: "telegram", notes: "Welcome message" },
      { title: "Community rules post", platform: "discord", notes: "Pin to rules channel" },
    ],
  },
  community_first: {
    name: "Community-First Launch",
    description: "Focus on community building before launch",
    checklist: [
      { section: "brand", title: "Define token name and ticker", description: "Finalize your memecoin identity" },
      { section: "brand", title: "Create logo and branding assets", description: "Design professional visuals" },
      { section: "community", title: "Set up Telegram group", description: "Create and configure your community channel" },
      { section: "community", title: "Set up Discord server", description: "Create your Discord community" },
      { section: "community", title: "Prepare community rules", description: "Define community guidelines" },
      { section: "content", title: "Write launch announcement", description: "Prepare your X/Twitter launch thread" },
      { section: "content", title: "Create content calendar", description: "Plan your first week of posts" },
      { section: "content", title: "Prepare community engagement plan", description: "Plan community activities" },
      { section: "technical", title: "Configure token metadata", description: "Set up token image and description" },
      { section: "technical", title: "Review liquidity pool strategy", description: "Plan your DEX launch" },
      { section: "post_launch", title: "Monitor holder growth", description: "Track early adoption" },
      { section: "post_launch", title: "Engage with community", description: "Respond to questions and feedback" },
      { section: "post_launch", title: "Host community events", description: "AMA, contests, or giveaways" },
    ],
    tasks: [
      { title: "Prepare launch announcement", priority: "high" },
      { title: "Set up X profile", priority: "high" },
      { title: "Set up Telegram group", priority: "high" },
      { title: "Set up Discord server", priority: "high" },
      { title: "Prepare community rules", priority: "high" },
      { title: "Prepare community engagement plan", priority: "medium" },
      { title: "Verify project links", priority: "medium" },
      { title: "Schedule launch announcement", priority: "high" },
      { title: "Schedule post-launch update", priority: "medium" },
    ],
    content: [
      { title: "Launch announcement thread", platform: "x", notes: "Pin to profile" },
      { title: "Community introduction", platform: "telegram", notes: "Welcome message" },
      { title: "Community rules post", platform: "discord", notes: "Pin to rules channel" },
      { title: "Community engagement teaser", platform: "x", notes: "Build anticipation" },
    ],
  },
};
