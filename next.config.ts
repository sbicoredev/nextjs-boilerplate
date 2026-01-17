import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const config: NextConfig = {};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(config);
