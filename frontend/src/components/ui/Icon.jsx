import React from 'react'
import * as Lucide from 'lucide-react'

/**
 * FarmOS Icon System
 * ------------------
 * Centralised SVG icon registry built on top of lucide-react.
 * Every decorative emoji across the UI is replaced by a crisp, themeable
 * SVG icon through this single component, so icons stay visually consistent
 * on every platform (no OS-dependent emoji glyphs).
 *
 * Usage:
 *   import { Icon } from '../components/ui/Icon'
 *   <Icon name="wheat" size={20} className="text-emerald-600" />
 *
 * Unknown names safely fall back to a neutral dot so a typo never crashes a
 * render (and never breaks the production build).
 */

// Semantic name -> lucide component map. Keys are short, memorable words used
// throughout the app; values are the matching lucide-react SVG components.
export const ICON_MAP = {
  // Brand / nature
  leaf: Lucide.Leaf,
  sprout: Lucide.Sprout,
  wheat: Lucide.Wheat,
  tractor: Lucide.Tractor,
  carrot: Lucide.Carrot,
  trees: Lucide.Trees,
  flower: Lucide.Flower2,

  // Charts / money
  chartUp: Lucide.TrendingUp,
  barChart: Lucide.BarChart3,
  pieChart: Lucide.PieChart,
  scale: Lucide.Scale,
  coins: Lucide.Coins,
  wallet: Lucide.Wallet,
  rupee: Lucide.IndianRupee,
  badgeRupee: Lucide.BadgeIndianRupee,
  receipt: Lucide.Receipt,
  banknote: Lucide.Banknote,
  percent: Lucide.Percent,

  // Logistics / places
  truck: Lucide.Truck,
  car: Lucide.Car,
  route: Lucide.Route,
  timer: Lucide.Timer,
  gauge: Lucide.Gauge,
  mapPin: Lucide.MapPin,
  pin: Lucide.Pin,
  landmark: Lucide.Landmark,
  store: Lucide.Store,
  globe: Lucide.Globe,
  building: Lucide.Building2,
  navigation: Lucide.Navigation,

  // Weather
  sun: Lucide.Sun,
  cloud: Lucide.Cloud,
  cloudSun: Lucide.CloudSun,
  cloudRain: Lucide.CloudRain,
  cloudSunRain: Lucide.CloudSunRain,
  cloudLightning: Lucide.CloudLightning,
  snowflake: Lucide.Snowflake,
  droplet: Lucide.Droplet,
  droplets: Lucide.Droplets,
  wind: Lucide.Wind,
  thermometer: Lucide.Thermometer,
  umbrella: Lucide.Umbrella,

  // Status / trust
  shieldCheck: Lucide.ShieldCheck,
  badgeCheck: Lucide.BadgeCheck,
  checkCircle: Lucide.CheckCircle2,
  check: Lucide.Check,
  xCircle: Lucide.XCircle,
  x: Lucide.X,
  alert: Lucide.AlertTriangle,
  info: Lucide.Info,
  clock: Lucide.Clock,
  hourglass: Lucide.Hourglass,
  lock: Lucide.Lock,
  unlock: Lucide.Unlock,
  flame: Lucide.Flame,
  sparkles: Lucide.Sparkles,
  star: Lucide.Star,
  zap: Lucide.Zap,

  // Actions / ui
  search: Lucide.Search,
  refresh: Lucide.RefreshCw,
  plus: Lucide.Plus,
  minus: Lucide.Minus,
  pencil: Lucide.Pencil,
  trash: Lucide.Trash2,
  menu: Lucide.Menu,
  arrowRight: Lucide.ArrowRight,
  arrowLeft: Lucide.ArrowLeft,
  arrowUpRight: Lucide.ArrowUpRight,
  chevronRight: Lucide.ChevronRight,
  chevronDown: Lucide.ChevronDown,
  externalLink: Lucide.ExternalLink,
  link: Lucide.Link,
  copy: Lucide.Copy,
  filter: Lucide.Filter,
  sliders: Lucide.SlidersHorizontal,
  download: Lucide.Download,

  // Communication
  bot: Lucide.Bot,
  message: Lucide.MessageCircle,
  messageSquare: Lucide.MessageSquare,
  send: Lucide.Send,
  phone: Lucide.Phone,
  mail: Lucide.Mail,
  handshake: Lucide.HeartHandshake,
  users: Lucide.Users,
  user: Lucide.User,
  userRound: Lucide.UserRound,

  // Commerce
  cart: Lucide.ShoppingCart,
  basket: Lucide.ShoppingBasket,
  package: Lucide.Package,
  boxes: Lucide.Boxes,
  clipboard: Lucide.ClipboardList,
  fileText: Lucide.FileText,
  scroll: Lucide.ScrollText,
  calendar: Lucide.Calendar,
  tag: Lucide.Tag,
  target: Lucide.Target,
  trophy: Lucide.Trophy,
  rocket: Lucide.Rocket,
  laptop: Lucide.Laptop,
  smartphone: Lucide.Smartphone,
  monitor: Lucide.Monitor,
  lightbulb: Lucide.Lightbulb,
  settings: Lucide.Settings,
  logout: Lucide.LogOut,
  party: Lucide.PartyPopper,
  layout: Lucide.LayoutDashboard,
  eye: Lucide.Eye,
  eyeOff: Lucide.EyeOff,
  activity: Lucide.Activity,
}

/**
 * <Icon /> — renders a lucide SVG by semantic name.
 */
export const Icon = ({
  name,
  size = 18,
  className = '',
  style = {},
  strokeWidth = 2,
  color,
  fallback = 'circle',
  ...rest
}) => {
  const Cmp = ICON_MAP[name] || ICON_MAP[fallback] || Lucide.Circle
  return (
    <Cmp
      size={size}
      className={`farmos-icon ${className}`}
      style={{ verticalAlign: '-0.15em', flexShrink: 0, ...(color ? { color } : {}), ...style }}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      focusable="false"
      {...rest}
    />
  )
}

/**
 * Small coloured status dot rendered as an inline SVG circle.
 * Replaces the coloured-circle emoji (green / blue / white / purple) with a
 * crisp, sizeable, colour-controlled dot that stays perfectly round everywhere.
 */
export const StatusDot = ({ color = '#22c55e', size = 8, style = {}, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 8 8"
    className={className}
    style={{ display: 'inline-block', verticalAlign: '0.05em', flexShrink: 0, ...style }}
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="4" cy="4" r="4" fill={color} />
  </svg>
)

export default Icon
