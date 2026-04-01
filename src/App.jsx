import React, { useState, useMemo } from 'react';
import { Users, AlertTriangle, CheckCircle, ArrowRightLeft, Copy, RefreshCw, Info, Trophy, Swords, Crown, LayoutDashboard, X, GripVertical, Search, ChevronDown, ChevronUp } from 'lucide-react';

// Dados dos jogadores baseados na lista fornecida
const initialPlayers = [
  { id: 1, name: 'Victor Borges Siqueira Campos', nick: 'obanai iguro#3994', phone: '13 92001-3463', main: 'TOP', sec: 'MID', usage: 'Main TOP' },
  { id: 2, name: 'Victor dos Santos Almeida', nick: 'SrCh4ve#BR1', phone: '11 953122652', main: 'TOP', sec: 'ADC', usage: 'Main TOP / Flex ADC' },
  { id: 3, name: 'Guilherme Gonzalez Câmara', nick: 'gzalez#zzz', phone: '13982260198', main: 'JG', sec: 'TOP', usage: 'Main JG / Flex TOP' },
  { id: 4, name: 'Caue Paiva Lucena', nick: 'Lauê Cuccena#br1', phone: '13981694051', main: 'JG', sec: 'SUP', usage: 'Main JG' },
  { id: 6, name: 'Joao Pedro Felippi da Costa', nick: 'Kavazaa#Furia', phone: '13991196998', main: 'MID', sec: 'ADC', usage: 'Autofill ADC / Flex MID' },
  { id: 7, name: 'Renan Rodrigo Campana dos Santos', nick: 'alexa ligar aura #rena', phone: '13974117750', main: 'MID', sec: '-', usage: 'Main MID' },
  { id: 8, name: 'Vitor Felipe Lima Gomes Vieira', nick: 'Meno Mandrakez #br1', phone: '11989994423', main: 'MID', sec: 'JG', usage: 'Autofill JG / Flex MID' },
  { id: 9, name: 'Maycon Lyncon Lima De Sousa', nick: 'Dynamo #TFC', phone: '13982066530', main: 'MID', sec: 'ADC', usage: 'Autofill ADC / Flex MID' },
  { id: 10, name: 'Rhuan Strele Ferreira de Andrade', nick: 'metalfox2001#BR1', phone: '13996644508', main: 'MID', sec: 'TOP', usage: 'Autofill TOP / Flex MID' },
  { id: 12, name: 'Lucas Azenha Paes', nick: '아스본#666', phone: '(11) 997539262', main: 'MID', sec: 'TOP', usage: 'Autofill TOP / Flex MID' },
  { id: 13, name: 'Paulo Ryen Masuda', nick: 'DsM#msd', phone: '13996248636', main: 'ADC', sec: 'JG', usage: 'Main ADC / Flex JG' },
  { id: 14, name: 'Renan Barroso Dos Santos', nick: 'Seighart #BR1', phone: '13991551881', main: 'ADC', sec: 'MID', usage: 'Main ADC / Flex MID' },
  { id: 15, name: 'Pedro Henrique Gomes Carrillo', nick: 'Honestcog#30065', phone: '13 99680-3743', main: 'ADC', sec: 'TOP', usage: 'Main ADC / Flex TOP' },
  { id: 16, name: 'Jullie Berdusco Melo', nick: 'juie#Juie', phone: '13996560283', main: 'SUP', sec: '-', usage: 'Main SUP' },
  { id: 17, name: 'Guilherme Lopes dos Santos', nick: 'Naja#gui', phone: '13996713934', main: 'SUP', sec: 'ADC', usage: 'Autofill ADC / Flex SUP' },
  { id: 18, name: 'Felipe Luiz da Silva', nick: 'ChayS#BR1', phone: '13996404897', main: 'SUP', sec: '-', usage: 'Main SUP' },
  { id: 19, name: 'Rodrigo Algamis', nick: 'RodrigoAlgamis#BR1', phone: '13996122000', main: 'SUP', sec: '-', usage: 'Main SUP' },
  { id: 21, name: 'Renan Garcia', nick: 'nxnzin#001', phone: '13 991520524', main: 'TOP', sec: 'MID', usage: 'Main TOP' },
  { id: 22, name: 'Luis Gustavo Araujo Santos', nick: 'soulzinhu#2222', phone: '13 99171-3318', main: 'SUP', sec: 'ADC', usage: 'Autofill ADC / Flex SUP' },
  { id: 23, name: 'Guilherme Bechelli', nick: 'BKL#1553', phone: '13 99648-3429', main: 'JG', sec: 'SUP', usage: 'Main JG / Flex SUP' },
  { id: 24, name: 'Eduardo Caldas Alves', nick: 'Rita Cake#2pac', phone: '13988161270', main: 'ADC', sec: '-', usage: 'Main ADC' },
  { id: 25, name: 'João Vitor Maia de Oliveira', nick: 'Kryynn #1852', phone: '11963415901', main: 'JG', sec: 'TOP', usage: 'Main JG / Flex TOP' },
  { id: 26, name: 'Matheus Godinho', nick: 'LittIe God#1302', phone: '13991152717', main: 'TOP', sec: 'SUP', usage: 'Main TOP / Flex SUP' },
  { id: 28, name: 'Igor Aparecido Couto Silva', nick: 'IRN kazuya#otaku', phone: '11 96449-7638', main: 'SUP', sec: 'MID', usage: 'Main SUP / Flex MID' },
  { id: 29, name: 'Lucas Croce', nick: 'APENAS RISADINHA#HAHA', phone: '-', main: 'TOP', sec: 'MID', usage: 'Main TOP / Flex MID' }
];

const ROLES = ['TOP', 'JG', 'MID', 'ADC', 'SUP'];
const TEAMS = ['Time 1', 'Time 2', 'Time 3', 'Time 4', 'Time 5'];

// Helper para pegar Primeiro e Último nome
const formatName = (fullName) => {
  if (!fullName) return '';
  const parts = fullName.trim().split(' ');
  if (parts.length <= 1) return fullName;
  return `${parts[0]} ${parts[parts.length - 1]}`;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('draft');
  const [winners, setWinners] = useState({
    1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null
  });

  const [teamLabels, setTeamLabels] = useState({
    'Time 1': 'Time 1',
    'Time 2': 'Time 2',
    'Time 3': 'Time 3',
    'Time 4': 'Time 4',
    'Time 5': 'Time 5'
  });

  const [draft, setDraft] = useState({
    'Time 1': { TOP: null, JG: null, MID: null, ADC: null, SUP: null },
    'Time 2': { TOP: null, JG: null, MID: null, ADC: null, SUP: null },
    'Time 3': { TOP: null, JG: null, MID: null, ADC: null, SUP: null },
    'Time 4': { TOP: null, JG: null, MID: null, ADC: null, SUP: null },
    'Time 5': { TOP: null, JG: null, MID: null, ADC: null, SUP: null },
    'Reservas': { RES1: null, RES2: null }
  });
  
  // ===== UI do Pool (busca/filtro/colapsar) =====
  const [poolQuery, setPoolQuery] = useState('');
  const [poolRole, setPoolRole] = useState('ALL');
  const [expandedRoles, setExpandedRoles] = useState(() =>
    Object.fromEntries(ROLES.map(r => [r, true]))
  );

  // Calculate assigned player IDs
  const assignedIds = useMemo(() => {
    const ids = [];
    Object.values(draft).forEach(team => {
      Object.values(team).forEach(playerId => {
        if (playerId) ids.push(playerId);
      });
    });
    return ids;
  }, [draft]);

  const unassignedPlayers = useMemo(() => {
    return initialPlayers.filter(p => !assignedIds.includes(p.id));
  }, [assignedIds]);


  const filteredUnassignedPlayers = useMemo(() => {
    const q = poolQuery.trim().toLowerCase();
    return unassignedPlayers.filter(p => {
      const matchesQuery = !q ||
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.nick && p.nick.toLowerCase().includes(q));

      const matchesRole = poolRole === 'ALL' || p.main === poolRole || p.sec === poolRole;
      return matchesQuery && matchesRole;
    });
  }, [unassignedPlayers, poolQuery, poolRole]);

  // Função para processar o Drag and Drop
  const handleAssignPlayer = (targetTeam, targetRole, playerIdStr) => {
    const playerId = parseInt(playerIdStr);
    if (!playerId) return;

    // Regra: se o jogador não tem secundária ("-"), ele só pode ser colocado na MAIN (exceto Reservas)
    const player = initialPlayers.find(p => p.id === playerId);
    if (!player) return;

    const isReserveSlot = targetRole.startsWith('RES');
    const sec = (player.sec ?? '').toString().trim();
    const mustPlayMain = !isReserveSlot && (sec === '-' || sec === '');
    if (mustPlayMain && player.main !== targetRole) {
      alert(`${formatName(player.name)} precisa jogar na lane MAIN (${player.main}).`);
      return;
    }

    setDraft(prev => {
      const nextDraft = JSON.parse(JSON.stringify(prev)); // Deep copy simple enough for this state
      
      // 1. Remove o jogador de onde ele estava antes (se já estivesse num time)
      for (const t of Object.keys(nextDraft)) {
        for (const r of Object.keys(nextDraft[t])) {
          if (nextDraft[t][r] === playerId) {
            nextDraft[t][r] = null;
          }
        }
      }
      
      // 2. Coloca o jogador na nova posição
      nextDraft[targetTeam][targetRole] = playerId;
      return nextDraft;
    });
  };

  const handleRemovePlayer = (team, role) => {
    setDraft(prev => ({
      ...prev,
      [team]: { ...prev[team], [role]: null }
    }));
  };

  const getPlayer = (id) => initialPlayers.find(p => p.id === id);

  const getMatchStatus = (player, slotRole) => {
    if (!player) return null;
    if (slotRole.startsWith('RES')) return 'NEUTRAL'; // Reservas aceitam qualquer um
    if (player.main === slotRole) return 'MAIN';
    if (player.sec === slotRole) return 'SEC';
    return 'OFFROLE';
  };

  const statusColors = {
    MAIN: 'border-green-400 bg-green-500/10 text-green-100',
    SEC: 'border-yellow-400 bg-yellow-500/10 text-yellow-100',
    OFFROLE: 'border-red-400 bg-red-500/10 text-red-100',
    NEUTRAL: 'border-[#FFD700]/30 bg-[#0A0510] text-white'
  };

  const statusIcons = {
    MAIN: <CheckCircle className="w-4 h-4 text-green-400" />,
    SEC: <ArrowRightLeft className="w-4 h-4 text-yellow-400" />,
    OFFROLE: <AlertTriangle className="w-4 h-4 text-red-400" />,
    NEUTRAL: <Users className="w-4 h-4 text-[#FFD700]" />
  };

  const resetDraft = () => {
    if (window.confirm("Tem certeza que deseja limpar todo o draft?")) {
      setDraft({
        'Time 1': { TOP: null, JG: null, MID: null, ADC: null, SUP: null },
        'Time 2': { TOP: null, JG: null, MID: null, ADC: null, SUP: null },
        'Time 3': { TOP: null, JG: null, MID: null, ADC: null, SUP: null },
        'Time 4': { TOP: null, JG: null, MID: null, ADC: null, SUP: null },
        'Time 5': { TOP: null, JG: null, MID: null, ADC: null, SUP: null },
        'Reservas': { RES1: null, RES2: null }
      });
      setWinners({ 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null });
      setTeamLabels({ 'Time 1': 'Time 1', 'Time 2': 'Time 2', 'Time 3': 'Time 3', 'Time 4': 'Time 4', 'Time 5': 'Time 5' });
    }
  };

  // Logica de Chaveamento / Torneio (5 times - dupla eliminação com play-in)
  const matches = useMemo(() => {
    const m1 = { id: 1, title: 'Jogo 1 (Play-in Superior)', t1: 'Time 4', t2: 'Time 5' };
    const m2 = { id: 2, title: 'Jogo 2 (Semi Superior)', t1: 'Time 2', t2: 'Time 3' };

    const m1Winner = winners[1];
    const m2Winner = winners[2];

    const m1Loser = m1Winner ? (m1Winner === m1.t1 ? m1.t2 : m1.t1) : null;
    const m2Loser = m2Winner ? (m2Winner === m2.t1 ? m2.t2 : m2.t1) : null;

    const m3 = { id: 3, title: 'Jogo 3 (Semi Superior)', t1: 'Time 1', t2: m1Winner };
    const m3Winner = winners[3];
    const m3Loser = (m3Winner && m3.t1 && m3.t2) ? (m3Winner === m3.t1 ? m3.t2 : m3.t1) : null;

    const m4 = { id: 4, title: 'Jogo 4 (Final Superior)', t1: m2Winner, t2: m3Winner };
    const m4Winner = winners[4];
    const m4Loser = (m4Winner && m4.t1 && m4.t2) ? (m4Winner === m4.t1 ? m4.t2 : m4.t1) : null;

    const m5 = { id: 5, title: 'Jogo 5 (Inferior R1 - Eliminação)', t1: m1Loser, t2: m2Loser };
    const m6 = { id: 6, title: 'Jogo 6 (Inferior R2 - Eliminação)', t1: winners[5], t2: m3Loser };
    const m7 = { id: 7, title: 'Jogo 7 (Inferior Final - Eliminação)', t1: winners[6], t2: m4Loser };

    const m8 = { id: 8, title: 'Jogo 8 (GRANDE FINAL)', t1: m4Winner, t2: winners[7] };

    return { 1: m1, 2: m2, 3: m3, 4: m4, 5: m5, 6: m6, 7: m7, 8: m8 };
  }, [winners]);

  const handleSetWinner = (matchId, teamId) => {
    if (!teamId) return;
    setWinners(prev => {
      const next = { ...prev, [matchId]: teamId };

      // Reseta jogos subsequentes (dependências do bracket de 5 times)
      const resetAfter = {
        1: [3, 4, 5, 6, 7, 8],
        2: [4, 5, 6, 7, 8],
        3: [4, 6, 7, 8],
        4: [7, 8],
        5: [6, 7, 8],
        6: [7, 8],
        7: [8]
      };

      (resetAfter[matchId] || []).forEach(id => {
        next[id] = null;
      });

      return next;
    });
  };

  const MatchCard = ({ match }) => {
    const isReady = match.t1 && match.t2;
    const winner = winners[match.id];

    return (
      <div className="bg-[#150A21] border border-[#FFD700]/20 rounded-xl overflow-hidden shadow-lg">
        <div className="bg-[#0A0510] py-2 px-4 border-b border-[#FFD700]/10 flex justify-between items-center">
          <span className="text-sm font-bold text-purple-200">{match.title}</span>
          {winner && <CheckCircle className="w-4 h-4 text-green-400" />}
        </div>
        <div className="p-3 space-y-2">
          {[match.t1, match.t2].map((teamId, idx) => {
            const isWinner = winner === teamId;
            const isLoser = winner && winner !== teamId;
            const displayTeamName = teamId ? (teamLabels[teamId] || teamId) : 'A definir';
            
            return (
              <button
                key={idx}
                disabled={!isReady || !teamId}
                onClick={() => handleSetWinner(match.id, teamId)}
                className={`w-full flex justify-between items-center px-4 py-3 rounded-lg border transition-all
                  ${!teamId ? 'border-[#0A0510] border-dashed text-purple-400/50 bg-[#0A0510]/50 cursor-not-allowed' : 
                    isWinner ? 'border-[#FFD700] bg-[#FFD700]/10 text-[#FFD700] ring-1 ring-[#FFD700]/30' : 
                    isLoser ? 'border-[#0A0510] bg-[#0A0510] text-purple-400/50 opacity-60' : 
                    'border-[#201030] bg-[#0A0510] text-purple-100 hover:border-[#FFD700]/50 hover:bg-[#201030] cursor-pointer'}
                `}
              >
                <span className="font-semibold">{displayTeamName}</span>
                {isWinner && <Trophy className="w-4 h-4 text-[#FFD700]" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const copyToClipboard = () => {
    let text = "📋 **DRAFT INHOUSE LOL** 📋\n\n";
    TEAMS.forEach(team => {
      text += `🔥 **${teamLabels[team]}**\n`;
      ROLES.forEach(role => {
        const p = getPlayer(draft[team][role]);
        text += `[${role}] ${p ? formatName(p.name) : 'Vazio'} (${p ? p.nick : ''})\n`;
      });
      text += "\n";
    });
    
    text += `🛡️ **Reservas**\n`;
    const r1 = getPlayer(draft['Reservas']['RES1']);
    const r2 = getPlayer(draft['Reservas']['RES2']);
    text += `1. ${r1 ? r1.nick : 'Vazio'}\n`;
    text += `2. ${r2 ? r2.nick : 'Vazio'}\n`;

    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      window.alert("Times copiados para a área de transferência!");
    } catch (err) {
      console.error('Falha ao copiar', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="min-h-screen bg-[#0A0510] text-purple-50 font-sans p-4 md:p-8 selection:bg-[#FFD700] selection:text-[#0A0510]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-[#150A21] p-6 rounded-xl border border-[#FFD700]/20 shadow-xl">
          <div>
            <h1 className="text-3xl font-bold text-[#FFD700] drop-shadow-sm">
              LoL Inhouse Draft Board
            </h1>
            <p className="text-purple-300 mt-1 text-sm md:text-base">Organize os {initialPlayers.length} jogadores em 5 times</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 items-center">
            
            <div className="flex bg-[#0A0510] p-1 rounded-lg border border-[#201030] shadow-inner">
              <button 
                onClick={() => setActiveTab('draft')} 
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm font-bold ${activeTab === 'draft' ? 'bg-[#FFD700] text-[#0A0510] shadow-md' : 'text-purple-400 hover:text-purple-100'}`}
              >
                <LayoutDashboard className="w-4 h-4" /> Draft
              </button>
              <button 
                onClick={() => setActiveTab('bracket')} 
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm font-bold ${activeTab === 'bracket' ? 'bg-[#FFD700] text-[#0A0510] shadow-md' : 'text-purple-400 hover:text-purple-100'}`}
              >
                <Swords className="w-4 h-4" /> Chaveamento
              </button>
            </div>

            <button onClick={resetDraft} className="flex items-center gap-2 px-4 py-2 bg-[#0A0510] hover:bg-[#201030] text-purple-200 rounded-lg transition border border-[#201030] hover:border-[#FFD700]/30 h-10 shadow-sm hover:shadow-md">
              <RefreshCw className="w-4 h-4" /> Resetar
            </button>
            <button onClick={copyToClipboard} className="flex items-center gap-2 px-4 py-2 bg-[#FFD700] hover:bg-yellow-400 text-[#0A0510] rounded-lg transition font-bold h-10 shadow-md hover:shadow-lg">
              <Copy className="w-4 h-4" /> Copiar Times
            </button>
          </div>
        </div>

        {activeTab === 'draft' && (
          <>
            {/* Dicas de Draft Banner */}
            <div className="bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-xl p-4 flex gap-4 text-purple-200 text-sm shadow-sm backdrop-blur-sm">
              <Info className="w-6 h-6 text-[#FFD700] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#FFD700] text-base block mb-2">Estratégia Recomendada para o Draft</strong>
                <ul className="list-disc list-inside space-y-1.5 marker:text-[#FFD700]/60">
                  <li><strong>Prioridade alta:</strong> Feche antes quem vai jogar <span className="font-semibold text-white">TOP, JG e ADC</span> (lanes escassas).</li>
                  <li><strong>Blocos abundantes:</strong> Deixe <span className="font-semibold text-white">MID e SUP</span> para encaixar depois.</li>
                  <li><strong>Tapar buracos:</strong> Use os nomes com lane secundária para completar as posições carentes.</li>
                  <li><strong>Excedentes (Reservas):</strong> Defina antes de começar se os 2 jogadores que sobrarem atuarão como reservas gerais ou se serão cortados.</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Draft Area - 2 Columns */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Legenda */}
                <div className="flex flex-wrap gap-4 p-4 bg-[#150A21] rounded-xl border border-[#201030] text-sm shadow-md">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]"></div> Jogando na Main Lane</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.3)]"></div> Jogando na Secundária (Autofill ok)</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]"></div> Fora de posição (Improvisado)</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {TEAMS.map(team => (
                    <div key={team} className="bg-[#150A21] rounded-xl border border-[#201030] p-5 shadow-lg flex flex-col gap-3">
                      <input 
                        type="text"
                        value={teamLabels[team]}
                        onChange={(e) => setTeamLabels(prev => ({...prev, [team]: e.target.value}))}
                        className="text-xl font-bold text-[#FFD700] bg-transparent border-b border-[#0A0510] pb-2 outline-none focus:border-b-[#FFD700] w-full transition-colors truncate"
                        placeholder={`Nome do ${team}`}
                      />
                      {ROLES.map(role => {
                        const selectedId = draft[team][role];
                        const selectedPlayer = getPlayer(selectedId);
                        const status = getMatchStatus(selectedPlayer, role);
                        
                        return (
                          <div key={`${team}-${role}`} className="flex items-center gap-3">
                            <span className="w-10 font-bold text-purple-400 text-sm">{role}</span>
                            <div 
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                e.preventDefault();
                                const playerId = e.dataTransfer.getData('playerId');
                                handleAssignPlayer(team, role, playerId);
                              }}
                              className={`flex-1 flex items-center min-h-[40px] gap-2 px-3 py-1.5 rounded-lg border transition-colors ${selectedPlayer ? statusColors[status] : 'border-[#201030] bg-[#0A0510] text-purple-500 border-dashed hover:border-[#FFD700]/40 shadow-inner'}`}
                            >
                              {selectedPlayer ? (
                                <div 
                                  draggable
                                  onDragStart={(e) => e.dataTransfer.setData('playerId', selectedPlayer.id.toString())}
                                  className="w-full flex items-center justify-between cursor-grab active:cursor-grabbing group"
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <GripVertical className="w-4 h-4 text-current opacity-30 group-hover:opacity-100 transition-opacity shrink-0" />
                                    {statusIcons[status]}
                                    <span className="text-sm font-medium truncate" title={selectedPlayer.nick}>{formatName(selectedPlayer.name)}</span>
                                  </div>
                                  <button 
                                    onClick={() => handleRemovePlayer(team, role)} 
                                    className="opacity-40 hover:opacity-100 hover:text-red-400 transition-all p-1 rounded-md hover:bg-black/40 shrink-0"
                                    title="Remover"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <span className="text-sm text-purple-500/50 italic select-none pl-2">Arraste um jogador...</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

            {/* Reserves */}
            <div className="bg-[#150A21] rounded-xl border border-[#201030] p-5 shadow-lg">
              <h2 className="text-xl font-bold text-[#FFD700] border-b border-[#0A0510] pb-2 mb-4">Reservas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {['RES1', 'RES2'].map(resRole => {
                  const selectedId = draft['Reservas'][resRole];
                  const selectedPlayer = getPlayer(selectedId);
                  
                  return (
                    <div key={resRole} className="flex items-center gap-3">
                      <span className="w-12 font-bold text-purple-400 text-sm">Res. {resRole.replace('RES', '')}</span>
                      <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const playerId = e.dataTransfer.getData('playerId');
                          handleAssignPlayer('Reservas', resRole, playerId);
                        }}
                        className={`flex-1 flex items-center min-h-[40px] gap-2 px-3 py-1.5 rounded-lg border transition-colors ${selectedPlayer ? statusColors.NEUTRAL : 'border-[#201030] bg-[#0A0510] text-purple-500 border-dashed hover:border-[#FFD700]/40 shadow-inner'}`}
                      >
                        {selectedPlayer ? (
                          <div 
                            draggable
                            onDragStart={(e) => e.dataTransfer.setData('playerId', selectedPlayer.id.toString())}
                            className="w-full flex items-center justify-between cursor-grab active:cursor-grabbing group"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <GripVertical className="w-4 h-4 text-current opacity-30 group-hover:opacity-100 transition-opacity shrink-0" />
                              <span className="text-sm font-medium truncate" title={selectedPlayer.nick}>{formatName(selectedPlayer.name)}</span>
                            </div>
                            <button 
                              onClick={() => handleRemovePlayer('Reservas', resRole)} 
                              className="opacity-40 hover:opacity-100 hover:text-red-400 transition-all p-1 rounded-md hover:bg-black/40 shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm text-purple-500/50 italic select-none pl-2">Arraste um jogador...</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column - Available Pool */}
          <div className="bg-[#150A21] rounded-xl border border-[#201030] flex flex-col max-h-[calc(100vh-8rem)] shadow-lg">
            <div className="p-5 border-b border-[#0A0510] bg-[#150A21] rounded-t-xl z-10 sticky top-0 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#FFD700]">Jogadores Livres</h2>
                <span className="bg-[#FFD700] text-[#0A0510] px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                  {filteredUnassignedPlayers.length} / {initialPlayers.length}
                </span>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={poolQuery}
                  onChange={(e) => setPoolQuery(e.target.value)}
                  placeholder="Buscar por nome ou nick…"
                  className="w-full bg-[#0A0510] border border-[#201030] rounded-lg pl-9 pr-3 py-2 text-sm text-purple-100
                             placeholder:text-purple-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 focus:border-[#FFD700]/40"
                />
              </div>

              {/* Role filter pills */}
              <div className="flex flex-wrap gap-2">
                {['ALL', ...ROLES].map((r) => (
                  <button
                    key={r}
                    onClick={() => setPoolRole(r)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition
                      ${poolRole === r
                        ? 'bg-[#FFD700] text-[#0A0510] border-[#FFD700]'
                        : 'bg-[#0A0510] text-purple-300 border-[#201030] hover:border-[#FFD700]/40'
                      }`}
                  >
                    {r === 'ALL' ? 'Todos' : r}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 overflow-y-auto flex-1 space-y-5">
              {ROLES.map((role) => {
                const playersForRole = filteredUnassignedPlayers
                  .filter(p => p.main === role || p.sec === role)
                  .sort((a, b) => {
                    // MAIN primeiro, depois nome
                    const aMain = a.main === role ? 0 : 1;
                    const bMain = b.main === role ? 0 : 1;
                    if (aMain !== bMain) return aMain - bMain;
                    return a.name.localeCompare(b.name);
                  });

                if (playersForRole.length === 0) return null;

                const isOpen = expandedRoles[role];

                return (
                  <div key={`pool-${role}`} className="space-y-2">
                    <button
                      onClick={() => setExpandedRoles(prev => ({ ...prev, [role]: !prev[role] }))}
                      className="w-full flex items-center justify-between text-sm font-bold text-[#FFD700]
                                 bg-[#0A0510] border border-[#201030] rounded-lg px-3 py-2 hover:border-[#FFD700]/40 transition"
                    >
                      <span className="flex items-center gap-2">
                        {role}
                        <span className="bg-[#150A21] text-purple-200 px-2 py-0.5 rounded-md text-xs border border-[#201030]">
                          {playersForRole.length}
                        </span>
                      </span>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isOpen && (
                      <div className="space-y-2">
                        {playersForRole.map((p) => {
                          const isMainHere = p.main === role;

                          return (
                            <div
                              key={`${role}-${p.id}`}
                              draggable
                              onDragStart={(e) => e.dataTransfer.setData('playerId', p.id.toString())}
                              className={`bg-[#0A0510] border p-3 rounded-lg transition cursor-grab active:cursor-grabbing
                                hover:border-[#FFD700]/40 shadow-sm group
                                ${isMainHere ? 'border-[#201030]' : 'border-dashed border-[#201030] opacity-90 hover:opacity-100'}
                              `}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <GripVertical className="w-4 h-4 text-purple-700 group-hover:text-[#FFD700] transition-colors shrink-0" />
                                    <span className="font-semibold text-sm text-purple-50 truncate" title={p.name}>
                                      {formatName(p.name)}
                                    </span>

                                    <span
                                      className={`text-[10px] px-2 py-0.5 rounded border
                                        ${isMainHere
                                          ? 'bg-green-500/10 text-green-300 border-green-500/20'
                                          : 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20'
                                        }`}
                                    >
                                      {isMainHere ? 'MAIN' : 'SEC'}
                                    </span>
                                  </div>

                                  <div className="text-xs text-purple-400 truncate mt-0.5">
                                    {p.nick}
                                  </div>
                                </div>

                                <div className="shrink-0 text-[10px] text-purple-300 flex flex-col items-end gap-1">
                                  <span className="bg-[#150A21] border border-[#201030] px-2 py-0.5 rounded">
                                    Main: <span className="text-purple-100">{p.main}</span>
                                  </span>
                                  {p.sec && p.sec !== '-' && (
                                    <span className="bg-[#150A21] border border-[#201030] px-2 py-0.5 rounded">
                                      Sec: <span className="text-purple-100">{p.sec}</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredUnassignedPlayers.length === 0 && (
                <div className="text-center text-purple-400 flex flex-col items-center gap-2 mt-10">
                  <CheckCircle className="w-12 h-12 text-[#FFD700]/30" />
                  <p>Nenhum jogador livre com esse filtro.</p>
                </div>
              )}

              {unassignedPlayers.length === 0 && (
                <div className="text-center text-purple-400 flex flex-col items-center gap-2 mt-10">
                  <CheckCircle className="w-12 h-12 text-[#FFD700]/30" />
                  <p>Todos os jogadores foram alocados!</p>
                </div>
              )}
            </div>
          </div>

        </div>
        </>
        )}

        {activeTab === 'bracket' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Upper Bracket */}
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-[#201030] pb-2">
                <Crown className="w-6 h-6 text-[#FFD700]" />
                <h2 className="text-2xl font-bold text-[#FFD700]">Chave Superior (Upper Bracket)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MatchCard match={matches[1]} />
                <MatchCard match={matches[2]} />
                <MatchCard match={matches[3]} />
                <MatchCard match={matches[4]} />
              </div>

              <p className="mt-3 text-xs text-purple-400">
                * Com 5 times, usamos um <span className="text-purple-200 font-semibold">play-in</span> (Jogo 1) e o <span className="text-purple-200 font-semibold">Time 1</span> entra com bye na semi (Jogo 3).
              </p>
            </div>

            {/* Lower Bracket */}
            <div className="pt-2">
              <div className="flex items-center gap-3 mb-6 border-b border-[#201030] pb-2">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h2 className="text-2xl font-bold text-[#FFD700]">Chave Inferior (Lower Bracket)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MatchCard match={matches[5]} />
                <MatchCard match={matches[6]} />
                <MatchCard match={matches[7]} />
              </div>
            </div>

            {/* Grand Final */}
            <div className="pt-2">
              <div className="flex items-center gap-3 mb-6 border-b border-[#201030] pb-2">
                <Trophy className="w-6 h-6 text-[#FFD700]" />
                <h2 className="text-2xl font-bold text-[#FFD700]">Grande Final</h2>
              </div>

              <div className="max-w-md mx-auto space-y-6">
                <MatchCard match={matches[8]} />

                {winners[8] && (
                  <div className="p-6 bg-gradient-to-br from-[#150A21] to-[#0A0510] border border-[#FFD700]/30 rounded-2xl text-center shadow-[0_0_30px_rgba(250,204,21,0.1)]">
                    <Trophy className="w-16 h-16 text-[#FFD700] mx-auto mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]" />
                    <h3 className="text-xl text-purple-200 font-medium">CAMPEÃO DO INHOUSE</h3>
                    <div className="text-4xl font-black text-[#FFD700] mt-2 drop-shadow-md">
                      {teamLabels[winners[8]]}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}