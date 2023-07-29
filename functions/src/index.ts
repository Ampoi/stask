import { initializeApp } from "firebase-admin/app"

import { checkMember } from "./function/checkMember.js"
import { getInviteGroupData } from "./function/getInviteGroupData.js"
import { joinInviteGroup } from "./function/joinInviteGroup.js"

initializeApp()

export { checkMember, getInviteGroupData, joinInviteGroup }