import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import "./src/env";

const config: NextConfig = {};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(config);
